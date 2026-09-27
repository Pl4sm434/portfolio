// Health Platformer - ported from the original Java Swing game (Pl4sm434/JavaFinal)
// Engine: fixed-resolution (650x480) canvas, 30ms physics tick (matches original javax.swing.Timer(30,...))

const UP = 0, DOWN = 1, RIGHT = 2, LEFT = 3;
const CANVAS_W = 650, CANVAS_H = 480;

const Game = {
  level: 1,
  time: 0,
  gravity: 1.0,
  running: false,
  paused: false,
  bgIndex: 0,
  finalTime: -1,
  endTimeStamp: 0,
  onLevelChange: null,
  onDeath: null,
  onFinish: null,
  onHealthChange: null,
};

function newPlayer(startX, startY) {
  return {
    x: startX, y: startY, newX: startX, newY: startY,
    vx: 4.0, vy: 0,
    dir: DOWN, dashDir: DOWN,
    onGround: false,
    invGravity: false, gotGravity: false,
    invDash: false, gotDash: false, hasDash: false,
    invWJ: false, gotWJ: false, hasWJ: false,
    justWJed: false, hasInstrOpen: false,
    WJdir: 0, aR: 0, aR2: 0,
    inv: { items: ["", "", "", ""], images: [null, null, null, null], cur: 0 },
    shift: 5, lastDir: RIGHT, gravityPos: 1,
    dashCooldown: 0, gravityCooldown: 0, dash: 4,
    timeInLava: 0, speed: 5, w: 20, health: 40, invincible: 0, weight: 1,
    lastCheckPoint: 0, deathCount: 0, resetCount: 0,
    keys: { left: false, right: false, up: false, down: false, space: false, e: false, p: false, r: false, one: false, two: false, three: false },
    prevKeys: { p: false, e: false }
  };
}

let p = null;

function resetGame() {
  Game.level = 1;
  Game.time = 0;
  Game.finalTime = -1;
  p = newPlayer(LEVELS[Game.level].sX, LEVELS[Game.level].sY);
}

function loadProgress() {
  try {
    const raw = localStorage.getItem('johan_portfolio_health_demo');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function saveProgress() {
  const save = {
    lastCheckPoint: p.lastCheckPoint,
    level: Game.level,
    deaths: p.deathCount,
    resets: p.resetCount,
    gotDash: p.invDash, gotWJ: p.invWJ, gotGravity: p.invGravity,
    bestTime: getBestTime(),
    time: Game.time
  };
  localStorage.setItem('johan_portfolio_health_demo', JSON.stringify(save));
}

function getBestTime() {
  const raw = localStorage.getItem('johan_portfolio_health_demo');
  if (!raw) return null;
  try { return JSON.parse(raw).bestTime || null; } catch (e) { return null; }
}

function continueFromSave() {
  const save = loadProgress();
  resetGame();
  if (save && save.lastCheckPoint) {
    p.lastCheckPoint = save.lastCheckPoint;
    p.deathCount = save.deaths || 0;
    p.resetCount = save.resets || 0;
    if (save.gotDash) { p.invDash = true; p.gotDash = true; p.inv.items[1] = "Dash"; p.inv.images[1] = IMG.DASH; p.inv.cur = 1; }
    if (save.gotWJ) { const slot = p.inv.cur === 1 ? 2 : 1; p.invWJ = true; p.inv.items[slot] = "Wall Jump"; p.inv.images[slot] = IMG.WALLJUMP; }
    if (save.gotGravity) { const slot = (p.inv.items[1] ? (p.inv.items[2] ? 3 : 2) : 1); p.invGravity = true; p.inv.items[slot] = "Gravity"; p.inv.images[slot] = IMG.GRAVITY; }
    if (p.inv.cur === 0 && (p.invDash || p.invWJ || p.invGravity)) p.inv.cur = 1;
    reset(save.lastCheckPoint);
    if (p.invDash) p.gotDash = true;
  }
}

function hasSave() {
  const s = loadProgress();
  return !!(s && s.lastCheckPoint);
}

// ---------------- Collision helpers ----------------

function noCollisions(newX, newY) {
  const level = LEVELS[Game.level];
  const w = p.w, health = p.health;

  for (const pl of level.platforms) {
    const lx = pl.x, rx = pl.x + pl.w, yT = pl.y, yB = pl.y + pl.h;
    if (lx - w < newX && newX < rx && yT - health < newY && newY < yB) return false;
  }
  for (const hg of level.healthGates) {
    const lx = hg.x, rx = hg.x + hg.w, yT = hg.y, yB = hg.y + hg.h;
    if (lx - w < newX && newX < rx && yT - health < newY && newY < yB && !(p.health > hg.minHealth)) return false;
  }
  for (const s of level.shooters) {
    const lx = s.x, rx = s.x + s.w, yT = s.y, yB = s.y + s.h;
    if (lx - w < newX && newX < rx && yT - health < newY && newY < yB) return false;
  }
  for (const ip of level.icePlatforms) {
    const lx = ip.x, rx = ip.x + ip.w, yT = ip.y, yB = ip.y + ip.h;
    if (lx - w < newX && newX < rx && yT - health < newY && newY < yB) return false;
  }
  for (const mp of level.movingPlatforms) {
    let lx = mp.x, rx = mp.x + mp.w, yT = mp.y, yB = mp.y + mp.h;
    const type = mp.type, d = mp.dir, speed = mp.speed;
    if (type === 0) {
      if (d === 1) { lx -= speed; rx -= speed; } else { lx += speed; rx += speed; }
    } else {
      if (d === 1) { yT -= speed; yB -= speed; } else { yT += speed; yB += speed; }
    }
    if (lx - w < newX && newX < rx && yT - health < newY && newY < yB) return false;
  }
  return true;
}

function intersectMovingPlatform(lx, rx, yT, yB, type, direction, speed, curX, curY) {
  const w = p.w, health = p.health, newX = p.newX, newY = p.newY, x = p.x, y = p.y;
  if ((newX <= lx && lx < newX + w) && (newY < yT && yT < newY + health)) {
    if ((type === 0 && curY + health <= yT) || (type === 1 && newY > y)) {
      p.newY = yT - health; p.vy = 0;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = lx - w; p.onGround = false; }
  } else if ((newX < rx && rx <= newX + w) && (newY < yT && yT < newY + health)) {
    if ((type === 0 && curY + health <= yT) || (type === 1 && newY > y)) {
      p.newY = yT - health; p.vy = 0;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = rx; p.onGround = false; }
  } else if ((newX <= lx && lx < newX + w) && (newY < yB && yB < newY + health)) {
    if (curY >= yB) {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = lx - w; }
    p.onGround = false;
  } else if ((newX < rx && rx <= newX + w) && (newY < yB && yB < newY + health)) {
    if (curY >= yB) {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = rx; }
    p.onGround = false;
  } else if (newX <= lx && lx < newX + w) {
    if (p.newY >= y) {
      p.vy = 0; p.newY = yT - health;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    }
  } else if (newX < rx && rx <= newX + w) {
    if (p.newY < y) {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else if (p.newY >= y) {
      p.vy = 0; p.newY = yT - health;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = rx; p.onGround = false; }
  } else if (newY < yT && yT < newY + health) {
    if (p.newY < y) {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else if (p.newY >= y) {
      p.vy = 0; p.newY = yT - health;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else { p.newX = rx; p.onGround = false; }
  } else if (newY < yB && yB < newY + health) {
    if (p.vy < 0) p.vy = 0;
    if (p.newY >= y && !(type === 1 && direction === DOWN)) {
      p.newY = yT - health; p.onGround = true; if (p.gotDash) p.hasDash = true;
    } else { p.newY = yB; p.onGround = false; }
  } else if (lx <= newX && newX + w <= rx && yT < newY && newY + health < yB) {
    if (p.newY < y) {
      if (p.vy < 0) p.vy = 0;
      p.newY = yB;
      if (p.gravityPos === -1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else if (p.newY >= y) {
      p.vy = 0; p.newY = yT - health;
      if (p.gravityPos === 1) { p.onGround = true; if (p.gotDash) p.hasDash = true; } else p.onGround = false;
    } else if (p.newX < x) { p.newX = lx - w; p.onGround = false; }
    else if (p.newX >= x) { p.newY = rx; p.onGround = false; }
  }
}

function landingOnPlatform() {
  const level = LEVELS[Game.level];
  const w = p.w, health = p.health, x = p.x, y = p.y;
  const solids = [];
  for (const pl of level.platforms) solids.push(pl);
  for (const hg of level.healthGates) if (!(p.health > hg.minHealth)) solids.push(hg);
  for (const s of level.shooters) solids.push(s);
  for (const ip of level.icePlatforms) solids.push(ip);

  for (const s of solids) {
    const lx = s.x, rx = s.x + s.w, yT = s.y, yB = s.y + s.h;
    if (lx - w < x && x < rx && yT - health < y && y < yB) {
      if (p.dir === DOWN) {
        if (p.gravityPos === 1) p.y = yT - health; else if (p.gravityPos === -1) p.y = yB;
        p.vy = 0; p.onGround = true; if (p.gotDash) p.hasDash = true;
      } else {
        if (p.dir === UP) {
          if (p.gravityPos === 1) p.y = yB; else if (p.gravityPos === -1) p.y = yT - health;
          p.vy = 0;
        }
        p.onGround = false;
      }
    }
  }
}

function checkExit() {
  const level = LEVELS[Game.level];
  for (const ex of level.exits) {
    const bD = level.bD, bU = level.bU, bL = level.bL, bR = level.bR;
    if (ex.type === 0) {
      if (p.y < bD && ex.low <= p.x && p.x <= ex.high) {
        p.y = LEVELS[ex.level].bU + 1;
        if (ex.nc !== -1) p.x += ex.nc;
        Game.level = ex.level; return true;
      }
    } else if (ex.type === 1) {
      if (p.x + p.w > bR && ex.low <= p.y && p.y <= ex.high) {
        p.x = LEVELS[ex.level].bL + 1;
        if (ex.nc !== -1) p.y += ex.nc;
        Game.level = ex.level; return true;
      }
    } else if (ex.type === 2) {
      if (p.y > bU && ex.low <= p.x && p.x <= ex.high) {
        p.y = LEVELS[ex.level].bD - 1;
        if (ex.nc !== -1) p.x += ex.nc;
        Game.level = ex.level; return true;
      }
    } else if (ex.type === 3) {
      if (p.x < bL && ex.low <= p.y && p.y <= ex.high) {
        p.x = LEVELS[ex.level].bR - 1 - p.w;
        if (ex.nc !== -1) p.y += ex.nc;
        Game.level = ex.level; return true;
      }
    }
  }
  return false;
}

function isTouchingLava() {
  const level = LEVELS[Game.level];
  for (const l of level.lava) {
    const lx = l.x, rx = l.x + l.w, by = l.y, ty = by + l.h;
    if (lx < p.x + p.w && p.x < rx && by < p.y + p.health && p.y < ty) return true;
  }
  for (const l of level.movingLava) {
    const lx = l.x, rx = l.x + l.w, by = l.y, ty = by + l.h;
    if (lx < p.x + p.w && p.x < rx && by < p.y + p.health && p.y < ty) return true;
  }
  return false;
}

function collectPowerups() {
  const level = LEVELS[Game.level];
  let ret = -1;
  for (const pu of level.powerups) {
    if (pu.collectedOnce) continue;
    const lx = pu.x, rx = pu.x + pu.w, yT = pu.y, yB = pu.y + pu.h;
    if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y && p.y < yB) {
      if (pu.type === 0 && !p.invDash) {
        if (addItem("Dash", IMG.DASH)) { p.gotDash = true; p.invDash = true; ret = 0; pu.collectedOnce = true; }
      } else if (pu.type === 1 && !p.invGravity) {
        if (addItem("Gravity", IMG.GRAVITY)) { p.gravityPos = -1; p.invGravity = true; ret = 1; pu.collectedOnce = true; }
      } else if (pu.type === 2 && !p.invWJ) {
        if (addItem("Wall Jump", IMG.WALLJUMP)) { p.gotWJ = true; p.invWJ = true; ret = 2; pu.collectedOnce = true; }
      }
    }
  }
  return ret;
}

function addItem(name, img) {
  for (let i = 1; i <= 3; i++) {
    if (p.inv.items[i] === "" || p.inv.items[i] === undefined) {
      p.inv.items[i] = name; p.inv.images[i] = img; p.inv.cur = i; return true;
    }
  }
  return false;
}

function switchItem(newCur) {
  const cur = p.inv.items[p.inv.cur];
  if (cur === "Dash") p.gotDash = false;
  else if (cur === "Gravity") p.gotGravity = false;
  else if (cur === "Wall Jump") p.gotWJ = false;
  p.inv.cur = newCur;
  const nxt = p.inv.items[newCur];
  if (nxt === "Dash") p.gotDash = true;
  else if (nxt === "Gravity") p.gotGravity = true;
  else if (nxt === "Wall Jump") p.gotWJ = true;
}

function isOnIce() {
  const level = LEVELS[Game.level];
  for (const ip of level.icePlatforms) {
    const lx = ip.x, rx = ip.x + ip.w, yT = ip.y, yB = ip.y + ip.h;
    if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y + 1 * p.gravityPos && p.y + 1 * p.gravityPos < yB) return true;
  }
  return false;
}

function collectItems() {
  const level = LEVELS[Game.level];
  for (const it of level.items) {
    const lx = it.x, rx = it.x + it.w, yT = it.y, yB = it.y + it.h;
    if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y && p.y < yB) {
      if (it.type === 0 && p.health < 40 && !it.collected) {
        it.collected = true;
        const startHealth = p.health;
        p.health += 10;
        if (p.health > 40) p.health = 40;
        for (let j = 0; j < p.health - startHealth; j++) {
          if (noCollisions(p.x, p.y - 1)) { if (p.gravityPos === 1) p.y--; } else break;
        }
      }
    }
  }
}

function openInstructions() {
  const level = LEVELS[Game.level];
  p.hasInstrOpen = false;
  for (const instr of level.instructions) {
    const lx = instr.x, rx = instr.x + instr.w, yT = instr.y, yB = instr.y + instr.h;
    if (instr.opened) p.hasInstrOpen = true;
    if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y && p.y < yB) {
      instr.standingOn = true;
      if (p.keys.e && !p.prevKeys.e) instr.opened = true;
    } else {
      instr.standingOn = false;
    }
  }
}

function getCheckPoints() {
  for (let i = 1; i <= CP_COUNT; i++) {
    const cp = CHECKPOINTS[i];
    if (!cp) continue;
    const lx = cp.x, rx = cp.x + cp.w, yT = cp.y, yB = cp.y + cp.h;
    if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y && p.y < yB && Game.level === cp.level) {
      if (p.lastCheckPoint > 0 && CHECKPOINTS[p.lastCheckPoint]) CHECKPOINTS[p.lastCheckPoint].gotten = false;
      p.lastCheckPoint = i;
      cp.gotten = true;
      saveProgress();
    }
  }
}

function intersectProjectile() {
  const level = LEVELS[Game.level];
  for (const s of level.shooters) {
    for (const proj of s.projectiles || []) {
      if (!proj || proj.stopped) continue;
      const lx = proj.x, rx = proj.x + proj.w, yT = proj.y, yB = proj.y + proj.h;
      if (lx - p.w < p.x && p.x < rx && yT - p.health < p.y && p.y < yB) {
        p.health -= 10; p.invincible = 30; proj.stopped = true; break;
      }
    }
  }
}

function reset(lastCP) {
  for (const lvl of Object.values(LEVELS)) {
    for (const it of lvl.items) it.collected = false;
  }
  if (!lastCP) {
    Game.level = 1;
    p.x = LEVELS[Game.level].sX; p.y = LEVELS[Game.level].sY;
  } else {
    const cp = CHECKPOINTS[lastCP];
    Game.level = cp.level;
    p.x = cp.x; p.y = cp.y;
  }
}

// ---------------- Level action (moving parts) ----------------

function levelAction(level) {
  for (const mp of level.movingPlatforms) movingPlatformAction(mp);
  for (const ml of level.movingLava) movingPlatformAction(ml);
  for (const s of level.shooters) shooterAction(s);
}

function movingPlatformAction(mp) {
  if (mp.dir === undefined) mp.dir = 1;
  if (mp.type === 0) {
    if (mp.x > mp.bH - mp.w) { mp.dir = -1; mp.x -= mp.speed; }
    else if (mp.x < mp.bL) { mp.dir = 1; mp.x += mp.speed; }
    else mp.x += mp.dir * mp.speed;
  } else {
    if (mp.y > mp.bH - mp.h) { mp.dir = -1; mp.y -= mp.speed; }
    else if (mp.y < mp.bL) { mp.dir = 1; mp.y += mp.speed; }
    else mp.y += mp.dir * mp.speed;
  }
}

function shooterAction(s) {
  if (!s.projectiles) { s.projectiles = []; s.projCount = 0; }
  if (Game.time % s.rate === 0) {
    const mk = (x, y, w, h, type) => ({ x, y, w, h, type, startX: x, startY: y, speed: s.speed, distance: s.distance, stopped: false });
    if (s.up) s.projectiles.push(mk((s.x * 2 + s.w) / 2 - s.pW / 2, s.y, s.pW, s.pH, 0));
    if (s.down) s.projectiles.push(mk((s.x * 2 + s.w) / 2 - s.pW / 2, s.y + s.h - s.pH, s.pW, s.pH, 1));
    if (s.right) s.projectiles.push(mk(s.x + s.w - s.pH, (s.y * 2 + s.h) / 2 - s.pW / 2, s.pH, s.pW, 2));
    if (s.left) s.projectiles.push(mk(s.x, (s.y * 2 + s.h) / 2 - s.pW / 2, s.pH, s.pW, 3));
  }
  for (const proj of s.projectiles) {
    if (proj.stopped) continue;
    if (proj.type === 0) { if (proj.startY - proj.y < proj.distance) proj.y -= proj.speed; }
    else if (proj.type === 1) { if (proj.y - proj.startY < proj.distance) proj.y += proj.speed; }
    else if (proj.type === 2) { if (proj.x - proj.startX < proj.distance) proj.x += proj.speed; }
    else if (proj.type === 3) { if (proj.startX - proj.x < proj.distance) proj.x -= proj.speed; }
  }
  s.projectiles = s.projectiles.filter(pr => !pr.stopped);
}

// ---------------- Player update (ported from Player.java update()) ----------------

function playerUpdate() {
  if (p.vy > 25) p.vy = 25;
  const touchingLava = isTouchingLava();
  const onIce = isOnIce();
  const level = LEVELS[Game.level];

  p.weight = p.health / 20.0 * 0.35 + 0.8;

  if ((p.gravityPos === -1 && noCollisions(p.x, p.y - 1)) || (p.gravityPos === 1 && noCollisions(p.x, p.y + 1))) {
    p.onGround = false;
  }

  if (p.keys.up && p.onGround && !p.hasInstrOpen) { p.vy = -13.5 * p.gravityPos; p.onGround = false; }

  if (p.keys.up && p.gotWJ && p.hasWJ && !p.hasInstrOpen) {
    p.justWJed = true;
    p.vx = p.shift * p.WJdir * (2.5 - p.weight) + (2.6 - p.weight) * p.WJdir;
    p.aR = 0; p.vy = -13.5; p.hasWJ = false; p.onGround = false;
  }
  if (p.justWJed) {
    p.aR += 0.1 * p.WJdir;
    p.vx -= p.aR;
    if ((p.WJdir === 1 && p.vx <= 0.0) || (p.WJdir === -1 && p.vx >= 0.0)) { p.vx = 0; p.aR = 0; p.justWJed = false; }
  }
  if (p.keys.up && touchingLava && p.timeInLava > 1 && !p.hasInstrOpen) { p.vy = -7.5 * p.gravityPos; p.onGround = false; }

  if (!p.keys.up && p.vy < -6.0) p.vy = -6.0;

  if (!noCollisions(p.x - 1, p.y) && noCollisions(p.x, p.y) && p.keys.left && !p.onGround && !p.keys.up && !p.justWJed) {
    p.hasWJ = true; p.WJdir = 1; if (p.gotWJ) p.vy = 0;
  } else if (!noCollisions(p.x + 1, p.y) && noCollisions(p.x, p.y) && p.keys.right && !p.onGround && !p.keys.up && !p.justWJed) {
    p.hasWJ = true; p.WJdir = -1; if (p.gotWJ) p.vy = 0;
  } else { p.hasWJ = false; }

  if (p.keys.right && !(p.justWJed && p.WJdir === -1) && !p.hasInstrOpen) {
    p.dir = RIGHT;
    for (let i = 0; i <= p.speed; i++) {
      if (noCollisions(p.x + (p.speed - i), p.y)) {
        if (touchingLava && i < p.speed - 1) i = p.speed - 2;
        p.vx = (p.speed - i);
        if (onIce && noCollisions(p.x + 1, p.y)) p.aR2 = -5.5;
        break;
      }
    }
  } else if (p.keys.left && !(p.justWJed && p.WJdir === 1) && !p.hasInstrOpen) {
    p.dir = LEFT;
    for (let i = 0; i <= p.speed; i++) {
      if (noCollisions(p.x - (p.speed - i), p.y)) {
        if (touchingLava && i < p.speed - 1) i = p.speed - 2;
        p.vx = -(p.speed - i);
        if (onIce && noCollisions(p.x - 1, p.y)) p.aR2 = 5.5;
        break;
      }
    }
  } else if (!p.justWJed) { p.vx = 0; }

  if (!onIce && p.onGround) p.aR2 = 0;
  p.vx -= p.aR2;

  if (!p.justWJed && !p.onGround) {
    if (((p.vx > 0 || p.aR2 < 0) && p.keys.left) || ((p.vx < 0 || p.aR2 > 0) && p.keys.right)) { p.vx = 0; p.aR2 = 0; }
  }
  if (p.aR2 > 0 && !noCollisions(p.x - 1, p.y)) p.aR2 = 0;
  else if (p.aR2 < 0 && !noCollisions(p.x + 1, p.y)) p.aR2 = 0;

  if (!p.justWJed && p.aR2 <= 0.1 && p.aR2 >= -0.1 && p.aR2 !== 0) p.aR2 = 0;
  else if (!p.justWJed && p.aR2 < 0 && Game.time % 2 === 0) p.aR2 += 0.1;
  else if (!p.justWJed && p.aR2 > 0 && Game.time % 2 === 0) p.aR2 -= 0.1;

  if (p.gravityCooldown === 0) {
    if (p.keys.space && p.gotGravity) { p.gravityPos *= -1; p.gravityCooldown = 7; }
  }
  if (p.gravityCooldown > 0) p.gravityCooldown--;

  if (p.dashCooldown === 0) {
    if (p.keys.space && !p.keys.right && !p.keys.left && !p.keys.up && !p.keys.down && p.hasDash && p.gotDash && !p.hasInstrOpen) { p.dash = 0; p.dashDir = p.lastDir; }
    if (p.keys.space && p.keys.right && p.hasDash && p.gotDash && !p.hasInstrOpen) { p.dash = 0; p.dashDir = RIGHT; }
    if (p.keys.space && p.keys.left && p.hasDash && p.gotDash && !p.hasInstrOpen) { p.dash = 0; p.dashDir = LEFT; }
    if (p.keys.space && p.keys.down && p.hasDash && p.gotDash && !p.hasInstrOpen) { p.dash = 0; p.dashDir = DOWN; }
    if (p.keys.space && p.keys.up && p.hasDash && p.gotDash && !p.hasInstrOpen) { p.dash = 0; p.dashDir = UP; }
    if (p.keys.space && !p.hasInstrOpen) { p.hasDash = false; p.keys.space = false; }
  }

  if (p.dash === 4) {
    p.newX = p.x;
    let dist = 0;
    while (Math.abs(dist) < Math.abs(p.vx)) {
      if (p.vx < 0) dist--; else dist++;
      if (noCollisions(p.x + dist, p.y)) p.newX = p.x + dist;
    }
    if (touchingLava && !p.keys.up) {
      if (p.onGround) p.vy = 0; else p.vy = 15 * p.gravityPos;
      p.newY = p.y + p.vy * 0.2;
    } else {
      p.vy += Game.gravity * p.gravityPos * p.weight;
      p.newY = p.y + p.vy;
      for (const mp of level.movingPlatforms) {
        const lx = mp.x, rx = mp.x + mp.w, yT = mp.y, yB = mp.y + mp.h;
        if (lx - p.w < p.newX && p.newX < rx && yT - p.health < p.newY && p.newY < yB) {
          intersectMovingPlatform(lx, rx, yT, yB, mp.type, mp.dir, mp.speed, p.x, p.y);
        }
      }
    }
    p.x = p.newX; p.y = p.newY;
  }

  if (p.dashCooldown > 0) p.dashCooldown--;

  if (p.dash < 4 && p.dashCooldown === 0) {
    p.dash++;
    if (p.vy > 0) p.vy = 0;
    if (p.dashDir === UP) {
      for (let i = 0; i < 21; i++) { if (noCollisions(p.x, p.y - 1 * p.gravityPos)) p.y -= 1 * p.gravityPos; if (isTouchingLava() && i < 17) i = 17; }
    } else if (p.dashDir === DOWN) {
      for (let i = 0; i < 21; i++) { if (noCollisions(p.x, p.y + 1)) p.y += 1 * p.gravityPos; if (isTouchingLava() && i < 17) i = 17; }
    } else if (p.dashDir === RIGHT) {
      for (let i = 0; i < 21; i++) { if (noCollisions(p.x + 1, p.y)) p.x++; if (isTouchingLava() && i < 17) i = 17; }
    } else if (p.dashDir === LEFT) {
      for (let i = 0; i < 21; i++) { if (noCollisions(p.x - 1, p.y)) p.x--; if (isTouchingLava() && i < 17) i = 17; }
    }
    if (p.dash === 4) p.dashCooldown = 7;
  }

  if (p.vy * p.gravityPos > 0) p.dir = DOWN; else p.dir = UP;

  collectPowerups();
  collectItems();
  openInstructions();
  landingOnPlatform();
  checkExit();
  getCheckPoints();

  if (p.invincible === 0) intersectProjectile(); else p.invincible--;

  if (touchingLava && !p.hasInstrOpen) {
    if (p.invincible === 0) { p.health -= 1; if (p.gravityPos === 1) p.y += 1; }
    p.timeInLava++;
  } else p.timeInLava = 0;

  if ((p.health <= 0 || p.keys.r) && !p.hasInstrOpen) {
    if (p.keys.r) { p.resetCount++; p.keys.r = false; } else { p.deathCount++; if (Game.onDeath) Game.onDeath(); }
    reset(p.lastCheckPoint);
    p.aR2 = p.vx = 0;
    p.health = 10;
    if (p.gravityPos === -1) p.gravityPos = 1;
    if (p.lastCheckPoint === 0) p.health += 30;
  }

  if (p.keys.one && !p.hasInstrOpen) switchItem(1);
  if (p.keys.two && !p.hasInstrOpen) switchItem(2);
  if (p.keys.three && !p.hasInstrOpen) switchItem(3);
  if (p.inv.items[p.inv.cur] !== "Gravity") p.gravityPos = 1;
}

// ---------------- Main tick ----------------

let prevLevelForCallback = null;

function tick() {
  if (!Game.running || Game.paused) return;
  if (Game.level !== 0) {
    levelAction(LEVELS[Game.level]);
    if (Game.level < LEVEL_COUNT && LEVELS[Game.level + 1] && LEVELS[Game.level + 1].shooters.length > 0) levelAction(LEVELS[Game.level + 1]);
    playerUpdate();
    Game.time++;
    if (Game.onHealthChange) Game.onHealthChange(p.health, p.invincible);
    if (prevLevelForCallback !== Game.level) {
      prevLevelForCallback = Game.level;
      if (Game.onLevelChange) Game.onLevelChange(Game.level);
    }
    if (Game.level === 0 && Game.finalTime < 0) {
      Game.finalTime = Game.time * 30.0 / 1000 / 60;
      const best = getBestTime();
      if (best === null || Game.finalTime < best) {
        const raw = localStorage.getItem('johan_portfolio_health_demo');
        const save = raw ? JSON.parse(raw) : {};
        save.bestTime = Game.finalTime;
        localStorage.setItem('johan_portfolio_health_demo', JSON.stringify(save));
      }
      Game.time = 0;
      if (Game.onFinish) Game.onFinish();
    }
  } else {
    Game.time++;
  }
  p.prevKeys.e = p.keys.e;
  p.prevKeys.p = p.keys.p;
}

// ---------------- Rendering ----------------

function healthColor(hPercent, invincible) {
  let c;
  if (hPercent >= 80.0) c = `rgb(0, ${Math.floor((80 - hPercent) * 155.0 / 31) + 255}, 0)`;
  else if (hPercent >= 60.0) c = `rgb(${Math.floor((100 - (hPercent + 20)) * 255.0 / 20)}, 255, 0)`;
  else if (hPercent >= 40.0) c = `rgb(255, ${Math.floor(2 * (hPercent - 40) + 215)}, 0)`;
  else if (hPercent >= 20.0) c = `rgb(255, ${Math.floor((215.0 / 30) * (hPercent - 10))}, 0)`;
  else c = `rgb(${Math.floor((116.0 / 20) * hPercent) + 139}, 0, 0)`;
  return c;
}

function render(ctx) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  const bg = IMG.BACKGROUNDS[Game.bgIndex];
  if (bg && bg.complete) ctx.drawImage(bg, 0, 0, CANVAS_W, CANVAS_H);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  if (Game.level !== 0) {
    const level = LEVELS[Game.level];

    // shooters + projectiles
    ctx.fillStyle = '#000';
    for (const s of level.shooters) {
      ctx.fillRect(s.x, s.y, s.w, s.h);
      ctx.fillStyle = '#f00';
      for (const proj of s.projectiles || []) ctx.fillRect(proj.x, proj.y, proj.w, proj.h);
      ctx.fillStyle = '#000';
    }
    // platforms
    for (const pl of level.platforms) ctx.fillRect(pl.x, pl.y, pl.w, pl.h);
    // moving platforms
    for (const mp of level.movingPlatforms) ctx.fillRect(mp.x, mp.y, mp.w, mp.h);
    // ice
    ctx.fillStyle = 'rgb(173,216,230)';
    for (const ip of level.icePlatforms) ctx.fillRect(ip.x, ip.y, ip.w, ip.h);
    // lava (animated green channel)
    level._lavaGreen = level._lavaGreen || 0;
    level._lavaDir = level._lavaDir || 0;
    if (level._lavaDir === 0) { level._lavaGreen += 2; if (level._lavaGreen >= 45) level._lavaDir = 1; }
    else { level._lavaGreen -= 2; if (level._lavaGreen <= 0) level._lavaDir = 0; }
    ctx.fillStyle = `rgb(207, ${55 + level._lavaGreen}, 16)`;
    for (const l of level.lava) ctx.fillRect(l.x, l.y, l.w, l.h);
    for (const l of level.movingLava) ctx.fillRect(l.x, l.y, l.w, l.h);

    // powerups
    for (const pu of level.powerups) {
      if (pu.collectedOnce) continue;
      const skip = (pu.type === 0 && p.invDash) || (pu.type === 1 && p.invGravity) || (pu.type === 2 && p.invWJ);
      if (skip) continue;
      const img = pu.type === 0 ? IMG.DASH : pu.type === 1 ? IMG.GRAVITY : IMG.WALLJUMP;
      if (img && img.complete) ctx.drawImage(img, pu.x, pu.y, pu.w, pu.h);
    }
    // items
    for (const it of level.items) {
      if (!it.collected && IMG.HEALTHKIT && IMG.HEALTHKIT.complete) ctx.drawImage(IMG.HEALTHKIT, it.x, it.y, it.w, it.h);
    }
    // instructions
    for (const instr of level.instructions) {
      if (IMG.FENCEPOST && IMG.FENCEPOST.complete) ctx.drawImage(IMG.FENCEPOST, instr.x, instr.y, instr.w, instr.h);
      instr._bobDir = instr._bobDir || 0; instr._bobDist = instr._bobDist || 0;
      if (instr._bobDir === 0) { instr._bobDist += 0.5; if (instr._bobDist >= 7) { instr._bobDist = 7; instr._bobDir = 1; } }
      else { instr._bobDist -= 0.5; if (instr._bobDist <= 0) { instr._bobDist = 0; instr._bobDir = 0; } }
      if (instr.opened) {
        drawInstructionDialog(ctx, instr);
      } else if (instr.standingOn && IMG.E && IMG.E.complete) {
        ctx.drawImage(IMG.E, instr.x, instr.y - instr.h + instr._bobDist, instr.w, instr.h);
      }
    }

    // checkpoints
    for (let i = 1; i <= CP_COUNT; i++) {
      const cp = CHECKPOINTS[i];
      if (cp && cp.level === Game.level) {
        const img = cp.gotten ? IMG.CHECKPOINTY : IMG.CHECKPOINT;
        if (img && img.complete) ctx.drawImage(img, cp.x, cp.y, cp.w, cp.h);
      }
    }

    // player
    const hPercent = p.health / 40.0 * 100;
    let c = healthColor(hPercent, p.invincible);
    if (!p.hasDash && p.gotDash) c = mergeWhite(c, 0.6);
    ctx.font = 'bold 20px monospace';
    if (p.invincible !== 0) { ctx.fillStyle = 'gray'; ctx.fillText(Math.floor(p.invincible), 410, 25); }
    else { ctx.fillStyle = c; ctx.fillText(Math.floor(p.health), 410, 25); }
    if (p.invincible % 7 === 0) {
      ctx.fillStyle = 'gray'; ctx.fillRect(440, 15, 120, 10);
      ctx.fillStyle = c; ctx.fillRect(440, 15, 3 * Math.floor(p.health), 10);
      ctx.fillRect(p.x, p.y, p.w, p.health);
    }

    // inventory
    for (let i = 1; i <= 3; i++) {
      ctx.fillStyle = p.inv.cur === i ? '#d3d3d3' : 'gray';
      ctx.fillRect(36 * i - 25, 5, 30, 30);
      if (p.inv.items[i] && p.inv.images[i] && p.inv.images[i].complete) {
        ctx.drawImage(p.inv.images[i], 36 * i - 23, 7, 26, 26);
      }
    }

    // things after player: health gates
    for (const hg of level.healthGates) {
      const passed = p.health > hg.minHealth;
      ctx.fillStyle = passed ? 'rgba(40,44,47,0.55)' : 'rgb(40,44,47)';
      ctx.fillRect(hg.x, hg.y, hg.w, hg.h);
      ctx.fillStyle = passed ? 'rgba(0,100,0,0.55)' : 'rgb(255,0,0)';
      ctx.font = `bold ${Math.floor(Math.min(hg.w, hg.h) / 2)}px monospace`;
      const str = '>' + Math.floor(hg.minHealth);
      const tw = ctx.measureText(str).width;
      ctx.fillText(str, hg.x + hg.w / 2 - tw / 2, hg.y + hg.h / 2 + 6);
    }
  } else {
    // ending screen
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
    ctx.font = 'bold 20px monospace'; ctx.fillStyle = '#fff';
    if (Game.time > 40) ctx.fillText('The Health Platformer', 100, 100);
    if (Game.time > 60) ctx.fillText('by Team Noobs', 100, 140);
    if (Game.time > 100) {
      const ft = Game.finalTime;
      ctx.fillText(`Final time: ${Math.floor(ft)} minutes and ${Math.floor((ft - Math.floor(ft)) * 60)} seconds.`, 100, 220);
    }
    if (Game.time > 125) ctx.fillText(`Total deaths: ${p.deathCount + p.resetCount} (${p.deathCount} deaths, ${p.resetCount} resets)`, 100, 260);
    if (Game.time > 160) ctx.fillText('Thanks for playing!', 100, 340);
  }
}

function mergeWhite(rgbStr, pct) {
  const m = rgbStr.match(/\d+/g).map(Number);
  const r = Math.floor((1 - pct) * m[0] + pct * 255);
  const g = Math.floor((1 - pct) * m[1] + pct * 255);
  const b = Math.floor((1 - pct) * m[2] + pct * 255);
  return `rgb(${r},${g},${b})`;
}

function drawInstructionDialog(ctx, instr) {
  ctx.fillStyle = 'rgb(61,44,19)';
  ctx.fillRect(180, 100, 280, 100);
  ctx.fillStyle = 'rgb(247,247,129)';
  ctx.font = 'bold 15px monospace';

  instr.curMessage = instr.curMessage || 1;
  instr.charsTyped = instr.charsTyped || 0;
  instr.index = instr.index || 1;

  if ((p.invWJ || p.gotWJ) && instr.special === 1) {
    instr.index = 1;
    instr.message[1] = "You can now wall jump!\nGo back into the exit to\nthe left and keep going\nleft after that!\n";
    instr.special = 0;
  } else if ((p.invWJ || p.gotWJ) && instr.special === 2) {
    instr.index = 1;
    instr.message[1] = "Use your new abilities to\nwall jump and wall slide\nyour way through these\nobstacles!\n";
    instr.special = 0;
  }

  const copy = instr.message[instr.curMessage] || "";
  const lineBreaks = copy.split('\n');
  // last element after trailing \n is '', drop it
  if (lineBreaks[lineBreaks.length - 1] === '') lineBreaks.pop();
  const lb = lineBreaks.length;

  for (let i = 1; i <= Math.min(lb, instr.index - 1); i++) {
    ctx.fillText(lineBreaks[i - 1], 185, 100 + 15 * i);
  }
  if (instr.index <= lb) {
    if (p.keys.p) instr.charsTyped++;
    else if (Game.time % 3 === 1 || Game.time % 3 === 2) instr.charsTyped++;
    const line = lineBreaks[instr.index - 1];
    if (instr.charsTyped <= line.length) {
      ctx.fillText(line.substring(0, instr.charsTyped), 185, 100 + 15 * instr.index);
    } else {
      instr.charsTyped = 0; instr.index++;
    }
  } else {
    ctx.font = 'italic 10px monospace';
    ctx.fillText('(Press Next)', 400, 195);
    if (p.keys.p && !p.prevKeys.p) {
      instr.index = 1; instr.charsTyped = 0; instr.curMessage++;
      if (instr.curMessage >= instr.message.length) { instr.opened = false; instr.curMessage = 1; }
    }
  }
}

// ---------------- Input ----------------

function keyDown(code) {
  if (code === 'ArrowLeft' || code === 'KeyA') p.keys.left = true;
  if (code === 'ArrowRight' || code === 'KeyD') p.keys.right = true;
  if (code === 'ArrowUp' || code === 'KeyW') p.keys.up = true;
  if (code === 'ArrowDown' || code === 'KeyS') p.keys.down = true;
  if (code === 'Space') p.keys.space = true;
  if (code === 'KeyE') p.keys.e = true;
  if (code === 'KeyR') p.keys.r = true;
  if (code === 'KeyP') p.keys.p = true;
  if (code === 'Digit1') p.keys.one = true;
  if (code === 'Digit2') p.keys.two = true;
  if (code === 'Digit3') p.keys.three = true;
}
function keyUp(code) {
  if (code === 'ArrowLeft' || code === 'KeyA') { p.keys.left = false; p.lastDir = LEFT; }
  if (code === 'ArrowRight' || code === 'KeyD') { p.keys.right = false; p.lastDir = RIGHT; }
  if (code === 'ArrowUp' || code === 'KeyW') p.keys.up = false;
  if (code === 'ArrowDown' || code === 'KeyS') p.keys.down = false;
  if (code === 'Space') p.keys.space = false;
  if (code === 'KeyE') p.keys.e = false;
  if (code === 'KeyR') p.keys.r = false;
  if (code === 'KeyP') p.keys.p = false;
  if (code === 'Digit1') p.keys.one = false;
  if (code === 'Digit2') p.keys.two = false;
  if (code === 'Digit3') p.keys.three = false;
}
