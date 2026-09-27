// UI wiring: screens, touch controls, asset loading, render loop.

function loadImg(src) { const i = new Image(); i.src = src; return i; }

IMG.DASH = loadImg('assets/Dash-min.png');
IMG.E = loadImg('assets/E.png');
IMG.FENCEPOST = loadImg('assets/Fencepost.png');
IMG.GRAVITY = loadImg('assets/Gravity.png');
IMG.WALLJUMP = loadImg('assets/WallJump.png');
IMG.HEALTHKIT = loadImg('assets/HealthKit.png');
IMG.CHECKPOINT = loadImg('assets/Checkpoint.png');
IMG.CHECKPOINTY = loadImg('assets/CheckpointY.png');
IMG.BACKGROUNDS = [loadImg('assets/bg2.jpg'), loadImg('assets/bg1.jpg'), loadImg('assets/bg3.png')];

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'screen-levels') buildLevelGrid();
  if (id === 'screen-home') refreshHomeStats();
  if (id === 'screen-more') refreshStatsTab();
}

document.querySelectorAll('[data-back]').forEach(btn => {
  btn.addEventListener('click', () => showScreen(btn.dataset.back));
});

// ---------------- Home ----------------

function refreshHomeStats() {
  const save = loadProgress();
  const btnContinue = document.getElementById('btn-continue');
  if (save && save.lastCheckPoint) {
    btnContinue.style.display = 'flex';
    document.getElementById('continue-label').textContent = `CONTINUE - LVL ${CHECKPOINTS[save.lastCheckPoint] ? CHECKPOINTS[save.lastCheckPoint].level : save.level}`;
    document.getElementById('stat-deaths-home').textContent = save.deaths || 0;
    document.getElementById('stat-resets-home').textContent = save.resets || 0;
    document.getElementById('stat-best-home').textContent = save.bestTime ? fmtTime(save.bestTime) : '-';
  } else {
    btnContinue.style.display = 'none';
    document.getElementById('stat-deaths-home').textContent = 0;
    document.getElementById('stat-resets-home').textContent = 0;
    document.getElementById('stat-best-home').textContent = '-';
  }
}

function fmtTime(t) { return `${Math.floor(t)}m ${Math.floor((t - Math.floor(t)) * 60)}s`; }

document.getElementById('btn-newgame').addEventListener('click', () => { resetGame(); startGame(); });
document.getElementById('btn-continue').addEventListener('click', () => { continueFromSave(); startGame(); });
document.getElementById('btn-levels-home').addEventListener('click', () => showScreen('screen-levels'));
document.getElementById('btn-more-home').addEventListener('click', () => showScreen('screen-more'));
document.getElementById('btn-settings-home').addEventListener('click', () => showScreen('screen-settings'));

// ---------------- Level select ----------------

function buildLevelGrid() {
  const grid = document.getElementById('level-grid');
  grid.innerHTML = '';
  const save = loadProgress();
  const unlockedLevel = save && save.level ? save.level : 1;
  for (let i = 1; i <= LEVEL_COUNT; i++) {
    const cell = document.createElement('div');
    cell.className = 'level-cell';
    cell.textContent = i;
    const unlocked = i <= Math.max(unlockedLevel, 1);
    if (!unlocked) cell.classList.add('locked');
    else cell.addEventListener('click', () => jumpToLevel(i));
    if (save && i < unlockedLevel) cell.classList.add('done');
    if (i === unlockedLevel) cell.classList.add('current');
    grid.appendChild(cell);
  }
}

function jumpToLevel(levelNum) {
  resetGame();
  const save = loadProgress();
  if (save) {
    if (save.gotDash) { p.invDash = true; p.gotDash = true; addItem("Dash", IMG.DASH); }
    if (save.gotWJ) { p.invWJ = true; addItem("Wall Jump", IMG.WALLJUMP); }
    if (save.gotGravity) { p.invGravity = true; addItem("Gravity", IMG.GRAVITY); }
  }
  Game.level = levelNum;
  p.x = LEVELS[levelNum].sX; p.y = LEVELS[levelNum].sY;
  startGame();
}

// ---------------- Settings ----------------

function buildBgSwatches() {
  const wrap = document.getElementById('bg-swatches');
  wrap.innerHTML = '';
  IMG.BACKGROUNDS.forEach((img, i) => {
    const sw = document.createElement('div');
    sw.className = 'swatch' + (Game.bgIndex === i ? ' active' : '');
    sw.style.backgroundImage = `url(${img.src})`;
    sw.addEventListener('click', () => {
      Game.bgIndex = i;
      document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
    });
    wrap.appendChild(sw);
  });
}
buildBgSwatches();

document.getElementById('btn-reset-progress').addEventListener('click', () => {
  localStorage.removeItem('johan_portfolio_health_demo');
  refreshHomeStats();
  showScreen('screen-home');
});

// ---------------- More / tabs ----------------

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.more-panel').forEach(pn => pn.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

function refreshStatsTab() {
  const save = loadProgress();
  document.getElementById('stat-deaths').textContent = (p ? p.deathCount : (save ? save.deaths : 0)) || 0;
  document.getElementById('stat-resets').textContent = (p ? p.resetCount : (save ? save.resets : 0)) || 0;
  document.getElementById('stat-best').textContent = save && save.bestTime ? fmtTime(save.bestTime) : '-';
  document.getElementById('stat-level').textContent = Game.level || 1;
  setAch('ach-dash', p && p.invDash);
  setAch('ach-wj', p && p.invWJ);
  setAch('ach-grav', p && p.invGravity);
  setAch('ach-finish', Game.finalTime >= 0);
  setAch('ach-noreset', p && p.lastCheckPoint > 0 && p.resetCount === 0);
}
function setAch(id, unlocked) {
  document.getElementById(id).classList.toggle('unlocked', !!unlocked);
}

// ---------------- Game screen ----------------

let rafId = null;
let tickIntervalId = null;

function startGame() {
  showScreen('screen-game');
  Game.running = true;
  Game.paused = false;
  document.getElementById('overlay-pause').classList.remove('show');
  document.getElementById('hud-level').textContent = Game.level;
  Game.onLevelChange = (lvl) => { document.getElementById('hud-level').textContent = lvl; };
  Game.onDeath = () => {};
  Game.onFinish = () => { saveProgress(); };
  if (rafId) cancelAnimationFrame(rafId);
  if (tickIntervalId) clearInterval(tickIntervalId);
  // Physics run on a fixed-rate interval (matches original 30ms Java Timer) so they keep
  // progressing even if requestAnimationFrame is throttled (e.g. backgrounded webview).
  tickIntervalId = setInterval(() => { if (Game.running && !Game.paused) tick(); }, 30);
  loop();
}

function loop() {
  rafId = requestAnimationFrame(loop);
  render(ctx);
  updateGameUI();
  fitCanvas();
}

function updateGameUI() {
  if (!p) return;
  const level = LEVELS[Game.level];
  const anyOpen = level && level.instructions.some(i => i.standingOn && !i.opened);
  const anyDialogOpen = level && level.instructions.some(i => i.opened);
  document.getElementById('btn-interact').classList.toggle('show', !!anyOpen && !anyDialogOpen);
  document.getElementById('btn-next').classList.toggle('show', !!anyDialogOpen);
  document.getElementById('btn-item1').classList.toggle('active', p.inv.cur === 1);
  document.getElementById('btn-item2').classList.toggle('active', p.inv.cur === 2);
  document.getElementById('btn-item3').classList.toggle('active', p.inv.cur === 3);
}

function fitCanvas() {
  const stage = document.querySelector('.game-stage');
  const w = stage.clientWidth, h = stage.clientHeight;
  const scale = Math.min(w / CANVAS_W, h / CANVAS_H);
  canvas.style.width = (CANVAS_W * scale) + 'px';
  canvas.style.height = (CANVAS_H * scale) + 'px';
}
window.addEventListener('resize', fitCanvas);

// pause
document.getElementById('btn-pause').addEventListener('click', () => {
  Game.paused = true;
  document.getElementById('overlay-pause').classList.add('show');
});
document.getElementById('btn-resume').addEventListener('click', () => {
  Game.paused = false;
  document.getElementById('overlay-pause').classList.remove('show');
});
document.getElementById('btn-restart-checkpoint').addEventListener('click', () => {
  reset(p.lastCheckPoint);
  p.health = p.lastCheckPoint === 0 ? 40 : 10 + 30;
  if (p.health > 40) p.health = 40;
  Game.paused = false;
  document.getElementById('overlay-pause').classList.remove('show');
});
document.getElementById('btn-quit-home').addEventListener('click', () => {
  Game.running = false;
  Game.paused = false;
  document.getElementById('overlay-pause').classList.remove('show');
  if (rafId) cancelAnimationFrame(rafId);
  if (tickIntervalId) clearInterval(tickIntervalId);
  showScreen('screen-home');
});

// ---------------- Touch controls ----------------

function bindHold(el, onDown, onUp) {
  const down = (e) => { e.preventDefault(); el.classList.add('pressed'); onDown(); };
  const up = (e) => { e.preventDefault(); el.classList.remove('pressed'); onUp(); };
  el.addEventListener('touchstart', down, { passive: false });
  el.addEventListener('touchend', up, { passive: false });
  el.addEventListener('touchcancel', up, { passive: false });
  el.addEventListener('mousedown', down);
  el.addEventListener('mouseup', up);
  el.addEventListener('mouseleave', up);
}

bindHold(document.getElementById('btn-jump'), () => { if (p) p.keys.up = true; }, () => { if (p) p.keys.up = false; });
bindHold(document.getElementById('btn-dash'), () => { if (p) p.keys.space = true; }, () => { if (p) p.keys.space = false; });

bindHold(document.getElementById('btn-left'), () => { if (p) p.keys.left = true; }, () => { if (p) { p.keys.left = false; p.lastDir = LEFT; } });
bindHold(document.getElementById('btn-right'), () => { if (p) p.keys.right = true; }, () => { if (p) { p.keys.right = false; p.lastDir = RIGHT; } });
bindHold(document.getElementById('btn-up'), () => { if (p) p.keys.up = true; }, () => { if (p) p.keys.up = false; });
bindHold(document.getElementById('btn-down'), () => { if (p) p.keys.down = true; }, () => { if (p) p.keys.down = false; });

document.getElementById('btn-item1').addEventListener('touchstart', (e) => { e.preventDefault(); if (p) switchItem(1); });
document.getElementById('btn-item2').addEventListener('touchstart', (e) => { e.preventDefault(); if (p) switchItem(2); });
document.getElementById('btn-item3').addEventListener('touchstart', (e) => { e.preventDefault(); if (p) switchItem(3); });
document.getElementById('btn-item1').addEventListener('click', () => { if (p) switchItem(1); });
document.getElementById('btn-item2').addEventListener('click', () => { if (p) switchItem(2); });
document.getElementById('btn-item3').addEventListener('click', () => { if (p) switchItem(3); });

function tapInteract() { if (!p) return; p.keys.e = true; setTimeout(() => { p.keys.e = false; }, 60); }
document.getElementById('btn-interact').addEventListener('touchstart', (e) => { e.preventDefault(); tapInteract(); });
document.getElementById('btn-interact').addEventListener('click', tapInteract);

function tapNext() { if (!p) return; p.keys.p = true; setTimeout(() => { p.keys.p = false; }, 60); }
document.getElementById('btn-next').addEventListener('touchstart', (e) => { e.preventDefault(); tapNext(); });
document.getElementById('btn-next').addEventListener('click', tapNext);

// ---------------- Keyboard fallback (desktop testing) ----------------

window.addEventListener('keydown', (e) => {
  if (!p || !Game.running) return;
  keyDown(e.code);
  if (e.code === 'Escape') {
    Game.paused = !Game.paused;
    document.getElementById('overlay-pause').classList.toggle('show', Game.paused);
  }
});
window.addEventListener('keyup', (e) => { if (p) keyUp(e.code); });

// init
refreshHomeStats();
fitCanvas();
