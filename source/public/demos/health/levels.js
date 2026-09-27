// Direct port of Game.java createLevels() - level geometry, powerups, checkpoints.
// Canvas logical resolution: 650x480 (matches original Java window), each level is one static "room".

const IMG = {}; // populated by game.js with loaded Image objects: DASH, GRAVITY, WALLJUMP, HEALTHKIT, CHECKPOINT, CHECKPOINTY, FENCEPOST, E, BACKGROUNDS[]

function L(sX, sY, bL, bR, bD, bU) {
  return {
    sX, sY, bL, bR, bD, bU,
    platforms: [], movingPlatforms: [], icePlatforms: [],
    lava: [], movingLava: [], healthGates: [], powerups: [],
    items: [], shooters: [], instructions: [], exits: []
  };
}
function plat(x, y, w, h) { return { x, y, w, h }; }

const LEVELS = {};
const CHECKPOINTS = {}; // index -> {x,y,w,h,level}

// level 0 = ending screen
LEVELS[0] = L(0, 0, 0, 650, 0, 480);

// ---- Level 1 ----
LEVELS[1] = L(170, 100, 120, 520, 40, 400);
LEVELS[1].platforms.push(plat(120,40,400,40), plat(120,40,40,360), plat(120,360,400,40));
LEVELS[1].exits.push({type:1, low:40, high:400, nc:-1, level:2});
LEVELS[1].instructions.push({x:185,y:310,w:50,h:50,special:0,message:[null,
  "Use the left and right arrow\nkeys to move, and the up arrow\nkey to jump. You can also use\nWASD.\n",
  "The height of your jump will\nbe determined by your weight.\n",
  "Less health means that you\nweigh less.\n",
  "In this game, you are the\nhealth bar!\n"]});

// ---- Level 2 ----
LEVELS[2] = L(170, 100, 120, 520, 40, 400);
LEVELS[2].platforms.push(
  plat(120,40,150,40), plat(370,40,150,40), plat(120,360,400,40),
  plat(180,318,280,42), plat(220,276,200,42), plat(260,234,120,42), plat(300,192,40,42)
);
LEVELS[2].exits.push({type:3, low:40, high:400, nc:-1, level:1});
LEVELS[2].exits.push({type:1, low:40, high:400, nc:-1, level:3});
LEVELS[2].exits.push({type:0, low:270, high:370, nc:-110, level:4});
LEVELS[2].instructions.push({x:295,y:142,w:50,h:50,special:0,message:[null,
  "Your jump is not high enough!\nGo collect the dash powerup\nfrom the room to the right.\n",
  "You might need to get lighter\nto make the jump.\n(Try less than 20 health!)\n"]});

// ---- Level 3 ----
LEVELS[3] = L(120, 320, 80, 560, 40, 400);
LEVELS[3].platforms.push(plat(80,40,480,40), plat(220,320,40,40), plat(380,320,40,40), plat(80,360,480,40), plat(520,40,40,360));
LEVELS[3].lava.push(plat(260,320,120,40));
LEVELS[3].powerups.push({x:310,y:200,w:30,h:30,type:0});
LEVELS[3].exits.push({type:3, low:40, high:400, nc:-1, level:2});
LEVELS[3].instructions.push({x:100,y:310,w:50,h:50,special:0,message:[null,
  "That powerup is the dash\npowerup! Be careful though,\ngoing in the lava pit will\ndecrease your health.\n",
  "The smaller you are, the\nlighter you get, which allows\nyou to jump higher!\n",
  "You can press space and a\ndirection key to dash after\ngetting the powerup.\nYour dash refills when you\ntouch the ground.\n"]});

// ---- Level 4 ----
LEVELS[4] = L(170, 100, 120, 520, 40, 360);
LEVELS[4].platforms.push(
  plat(120,40,150,40), plat(370,40,150,40), plat(120,40,40,360), plat(260,360,260,40),
  plat(480,80,40,300), plat(160,270,290,40), plat(190,180,290,40)
);
LEVELS[4].lava.push(plat(420,330,30,30), plat(300,240,75,30));
LEVELS[4].items.push({x:310,y:110,w:30,h:30,type:0});
CHECKPOINTS[1] = {x:310,y:310,w:50,h:50,level:4};
LEVELS[4].exits.push({type:2, low:160, high:260, nc:110, level:2});
LEVELS[4].exits.push({type:0, low:270, high:370, nc:-110, level:5});

// ---- Level 5 ----
LEVELS[5] = L(170, 100, 120, 520, 40, 360);
LEVELS[5].platforms.push(
  plat(120,40,150,40), plat(370,40,150,40), plat(120,40,40,360), plat(260,360,260,40),
  plat(480,40,40,360), plat(360,40,40,215), plat(160,270,290,40)
);
LEVELS[5].movingPlatforms.push({x:240,y:150,w:50,h:20,bL:180,bH:340,speed:2,type:0});
LEVELS[5].lava.push(plat(310,340,80,20), plat(310,340,80,20), plat(420,310,30,20));
LEVELS[5].exits.push({type:2, low:160, high:260, nc:110, level:4});
LEVELS[5].exits.push({type:0, low:270, high:370, nc:-190, level:7});

// ---- Level 6 ----
LEVELS[6] = L(120, 320, 0, 640, 0, 400);
LEVELS[6].instructions.push({x:550,y:350,w:50,h:50,special:2,message:[null,
  "You can't get up there yet!\nCome back here when you have\nthe appropriate powerup.\nTry heading to the right.\n"]});
LEVELS[6].platforms.push(
  plat(0,0,650,40), plat(0,400,640,40), plat(600,40,40,270), plat(0,130,40,270),
  plat(500,90,40,310), plat(350,40,40,310), plat(240,200,40,200), plat(120,40,40,290)
);
LEVELS[6].lava.push(plat(420,90,80,30), plat(390,230,80,30), plat(420,370,80,30), plat(240,40,40,50), plat(120,380,40,20), plat(120,330,40,20));
LEVELS[6].movingPlatforms.push({x:240,y:90,w:40,h:120,bL:90,bH:300,speed:5,type:1});
LEVELS[6].exits.push({type:1, low:40, high:400, nc:-1, level:7});
LEVELS[6].exits.push({type:3, low:40, high:400, nc:-1, level:11});
CHECKPOINTS[4] = {x:505,y:40,w:50,h:50,level:6};

// ---- Level 7 ----
LEVELS[7] = L(120, 320, 0, 640, 0, 400);
LEVELS[7].platforms.push(
  plat(0,0,650,40), plat(170,400,470,40), plat(0,400,80,40), plat(600,130,40,270),
  plat(0,40,40,270), plat(210,360,40,40)
);
LEVELS[7].lava.push(plat(250,360,350,40));
LEVELS[7].movingLava.push(
  {x:210,y:140,w:40,h:40,bL:40,bH:360,speed:5,type:1},
  {x:400,y:60,w:20,h:40,bL:40,bH:360,speed:5,type:1},
  {x:400,y:180,w:20,h:40,bL:40,bH:360,speed:5,type:1},
  {x:545,y:60,w:20,h:40,bL:40,bH:360,speed:5,type:1},
  {x:545,y:180,w:20,h:40,bL:40,bH:360,speed:5,type:1}
);
LEVELS[7].movingPlatforms.push(
  {x:330,y:180,w:40,h:20,bL:100,bH:320,speed:2,type:1},
  {x:450,y:100,w:60,h:20,bL:100,bH:320,speed:2,type:1}
);
LEVELS[7].exits.push({type:2, low:0, high:370, nc:190, level:5});
LEVELS[7].exits.push({type:1, low:0, high:400, nc:270, level:8});
LEVELS[7].exits.push({type:3, low:0, high:400, nc:0, level:6});

// ---- Level 8 ----
LEVELS[8] = L(120, 320, 0, 640, 0, 400);
LEVELS[8].platforms.push(plat(0,40,40,270), plat(0,400,640,40), plat(0,0,300,40), plat(380,0,270,40), plat(600,130,40,270));
LEVELS[8].healthGates.push({x:300,y:320,w:80,h:80,minHealth:30,visible:true}, {x:600,y:40,w:40,h:90,minHealth:30,visible:true});
LEVELS[8].movingPlatforms.push({x:320,y:100,w:40,h:20,bL:100,bH:300,speed:3,type:1}, {x:560,y:100,w:40,h:20,bL:100,bH:300,speed:3,type:1});
CHECKPOINTS[2] = {x:110,y:350,w:50,h:50,level:8};
LEVELS[8].instructions.push({x:185,y:350,w:50,h:50,special:1,message:[null,
  "What you see in front of you\nis called a \"Health Gate\".\nThese are special obstacles\nthat you will encounter.\n",
  "Currently the gate is solid.\nYou need to have more than\nthe amount of health shown on\nthe gate to pass through.\n",
  "There is a blocked exit at the\ntop right of this room. Find\na way to increase your health\nand return here.\n\n(Go straight up!)\n"]});
LEVELS[8].exits.push({type:3, low:0, high:400, nc:-270, level:7});
LEVELS[8].exits.push({type:1, low:0, high:400, nc:-1, level:10});
LEVELS[8].exits.push({type:0, low:0, high:650, nc:0, level:9});

// ---- Level 9 ----
LEVELS[9] = L(120, 320, 0, 640, 0, 400);
LEVELS[9].platforms.push(
  plat(0,400,300,40), plat(380,400,270,40), plat(0,40,40,360), plat(610,40,40,360),
  plat(380,40,40,280), plat(0,0,650,40), plat(260,280,200,40), plat(420,160,40,40),
  plat(570,120,40,40), plat(570,240,40,40)
);
LEVELS[9].healthGates.push({x:260,y:320,w:40,h:80,minHealth:10,visible:true});
LEVELS[9].items.push({x:500,y:70,w:30,h:30,type:0}, {x:125,y:70,w:30,h:30,type:0}, {x:265,y:70,w:30,h:30,type:0});
LEVELS[9].movingLava.push(
  {x:460,y:120,w:110,h:40,bL:120,bH:320,speed:4,type:1},
  {x:40,y:120,w:80,h:20,bL:40,bH:380,speed:8,type:0},
  {x:40,y:260,w:80,h:20,bL:40,bH:260,speed:4,type:0}
);
LEVELS[9].movingPlatforms.push({x:100,y:180,w:80,h:20,bL:61,bH:359,speed:3,type:0});
LEVELS[9].exits.push({type:2, low:0, high:650, nc:0, level:8});

// ---- Level 10 ----
LEVELS[10] = L(120, 320, 0, 640, 0, 400);
LEVELS[10].platforms.push(
  plat(0,0,650,40), plat(0,400,650,40), plat(0,130,190,40), plat(110,210,190,40), plat(0,290,190,40),
  plat(0,130,40,200), plat(600,130,40,200), plat(300,40,40,360)
);
LEVELS[10].movingLava.push(
  {x:190,y:170,w:40,h:40,bL:40,bH:300,speed:5,type:0},
  {x:140,y:170,w:40,h:40,bL:40,bH:300,speed:5,type:0},
  {x:190,y:250,w:40,h:40,bL:110,bH:300,speed:10,type:0},
  {x:460,y:180,w:160,h:20,bL:340,bH:600,speed:2,type:0},
  {x:360,y:280,w:160,h:20,bL:340,bH:600,speed:2,type:0}
);
LEVELS[10].healthGates.push({x:0,y:40,w:40,h:90,minHealth:30,visible:true});
CHECKPOINTS[3] = {x:50,y:80,w:50,h:50,level:10};
LEVELS[10].movingPlatforms.push(
  {x:400,y:260,w:80,h:20,bL:380,bH:560,speed:2,type:0},
  {x:500,y:160,w:80,h:20,bL:380,bH:560,speed:2,type:0}
);
LEVELS[10].powerups.push({x:460,y:100,w:30,h:30,type:2});
LEVELS[10].instructions.push({x:450,y:350,w:50,h:50,special:0,message:[null,
  "That powerup allows you to\nwall jump! You can switch\nto different powerups using\nthe number keys 1, 2, and 3.\nCurrently, you only have the\ndash powerup.\n",
  "To use this powerup, hold a\ndirection key when sliding\ndown a wall to \"stick\". Then,\nyou can press the up arrow\nkey to jump off walls.\n"]});
LEVELS[10].exits.push({type:3, low:0, high:200, nc:-1, level:8});
LEVELS[10].exits.push({type:1, low:0, high:200, nc:270, level:8});
LEVELS[10].exits.push({type:3, low:200, high:400, nc:-1, level:10});
LEVELS[10].exits.push({type:1, low:200, high:400, nc:-1, level:10});

// ---- Level 11 ----
LEVELS[11] = L(120, 320, 0, 640, 0, 400);
LEVELS[11].platforms.push(
  plat(0,0,650,40), plat(0,400,640,40), plat(80,130,560,40), plat(600,130,40,180), plat(0,40,40,360),
  plat(80,130,40,220), plat(200,220,40,180), plat(280,130,40,220), plat(360,220,40,180)
);
LEVELS[11].movingLava.push(
  {x:460,y:40,w:80,h:25,bL:350,bH:560,speed:4,type:0},
  {x:360,y:105,w:80,h:25,bL:350,bH:560,speed:4,type:0},
  {x:260,y:70,w:30,h:20,bL:40,bH:130,speed:4,type:1}
);
LEVELS[11].healthGates.push({x:40,y:130,w:40,h:40,minHealth:9,visible:true}, {x:80,y:350,w:40,h:50,minHealth:9,visible:true});
LEVELS[11].items.push({x:260,y:70,w:30,h:30,type:0}, {x:485,y:270,w:30,h:30,type:0});
LEVELS[11].lava.push(plat(60,200,20,40), plat(40,310,20,40), plat(160,210,40,190), plat(240,385,120,15));
LEVELS[11].exits.push({type:1, low:40, high:200, nc:-1, level:6});
LEVELS[11].exits.push({type:1, low:200, high:400, nc:-1, level:12});
CHECKPOINTS[5] = {x:115,y:350,w:50,h:50,level:11};

// ---- Level 12 ----
LEVELS[12] = L(20, 320, 0, 640, 0, 400);
LEVELS[12].platforms.push(
  plat(0,0,650,40), plat(0,400,80,40), plat(0,440,640,40), plat(0,40,40,270), plat(150,200,40,40),
  plat(340,90,20,310), plat(410,40,20,20), plat(400,200,40,40), plat(480,90,20,310), plat(520,40,20,200),
  plat(560,300,80,40), plat(620,40,20,200)
);
LEVELS[12].lava.push(plat(80,400,640,40));
LEVELS[12].movingPlatforms.push({x:300,y:240,w:20,h:100,bL:40,bH:400,speed:5,type:1});
LEVELS[12].movingLava.push({x:300,y:140,w:20,h:100,bL:-60,bH:300,speed:5,type:1}, {x:400,y:200,w:40,h:40,bL:40,bH:360,speed:4,type:1});
LEVELS[12].items.push({x:565,y:100,w:30,h:30,type:0});
LEVELS[12].exits.push({type:3, low:200, high:400, nc:-1, level:11});
LEVELS[12].exits.push({type:1, low:0, high:300, nc:-21, level:13});
CHECKPOINTS[6] = {x:20,y:350,w:50,h:50,level:12};

// ---- Level 13 ----
LEVELS[13] = L(70, 150, 0, 640, 0, 400);
LEVELS[13].platforms.push(
  plat(0,280,150,20), plat(0,-100,60,320), plat(130,30,20,250), plat(220,-100,20,455),
  plat(90,355,150,20), plat(0,300,20,160), plat(0,425,645,20), plat(0,-100,645,20),
  plat(320,50,20,375), plat(320,50,250,20), plat(395,145,250,20), plat(320,230,250,20), plat(395,335,250,20),
  plat(625,-100,20,506)
);
LEVELS[13].movingPlatforms.push({x:260,y:410,w:40,h:20,bL:100,bH:410,speed:5,type:1});
LEVELS[13].items.push(
  {x:100,y:190,w:30,h:30,type:0},{x:60,y:110,w:30,h:30,type:0},{x:100,y:30,w:30,h:30,type:0},
  {x:190,y:190,w:30,h:30,type:0},{x:150,y:110,w:30,h:30,type:0},{x:190,y:30,w:30,h:30,type:0},
  {x:90,y:325,w:30,h:30,type:0},{x:120,y:325,w:30,h:30,type:0},{x:240,y:330,w:30,h:30,type:0},
  {x:290,y:250,w:30,h:30,type:0},{x:240,y:170,w:30,h:30,type:0},{x:290,y:90,w:30,h:30,type:0},
  {x:425,y:115,w:30,h:30,type:0},{x:455,y:115,w:30,h:30,type:0},{x:485,y:115,w:30,h:30,type:0},
  {x:450,y:200,w:30,h:30,type:0},{x:480,y:200,w:30,h:30,type:0},{x:510,y:200,w:30,h:30,type:0},
  {x:455,y:305,w:30,h:30,type:0},{x:485,y:305,w:30,h:30,type:0},{x:455,y:250,w:30,h:30,type:0},{x:485,y:250,w:30,h:30,type:0}
);
LEVELS[13].instructions.push({x:50,y:230,w:50,h:50,special:0,message:[null,"Don't touch the health kits!\nIf you need to restart press R.\n"]});
LEVELS[13].exits.push({type:3, low:230, high:300, nc:21, level:12});
LEVELS[13].exits.push({type:1, low:300, high:450, nc:-1, level:14});
CHECKPOINTS[7] = {x:10,y:230,w:50,h:50,level:13};

// ---- Level 14 ----
LEVELS[14] = L(70, 350, 0, 640, 0, 425);
LEVELS[14].platforms.push(
  plat(0,425,645,20), plat(20,0,110,20), plat(200,0,420,20), plat(0,0,20,406), plat(620,0,20,430)
);
LEVELS[14].lava.push(plat(20,20,20,386), plat(600,20,20,405), plat(40,220,130,20), plat(470,220,130,20));
LEVELS[14].movingPlatforms.push({x:240,y:220,w:150,h:20,bL:170,bH:470,speed:2,type:0});
LEVELS[14].shooters.push(
  {x:600,y:280,w:20,h:20,speed:5,rate:30,distance:650,pW:15,pH:30,up:false,down:false,right:false,left:true},
  {x:0,y:200,w:20,h:20,speed:5,rate:30,distance:650,pW:15,pH:30,up:false,down:false,right:true,left:false},
  {x:600,y:120,w:20,h:20,speed:5,rate:30,distance:650,pW:15,pH:30,up:false,down:false,right:false,left:true},
  {x:0,y:40,w:20,h:20,speed:5,rate:30,distance:650,pW:15,pH:30,up:false,down:false,right:true,left:false}
);
CHECKPOINTS[8] = {x:250,y:375,w:50,h:50,level:14};
LEVELS[14].instructions.push({x:350,y:375,w:50,h:50,special:0,message:[null,
  "Congratulations on making it\nthis far! Go collect the\nantigravity powerup, your\nfinal powerup on this journey!\n",
  "To use this powerup, press\nspace to toggle the gravity.\nThis allows you to walk on\nthe ceiling!\n",
  "Watch out for the red bullets.\nThey will take off 10 hp when\nyou hit them. However, you\nalso get some invincibility\ntime after, so you don't get\nconstantly hit.\n"]});
LEVELS[14].exits.push({type:3, low:300, high:450, nc:-1, level:13});
LEVELS[14].powerups.push({x:310,y:330,w:30,h:30,type:1});
LEVELS[14].exits.push({type:0, low:0, high:450, nc:-1, level:15});

// ---- Level 15 ----
LEVELS[15] = L(70, 350, 0, 640, 0, 425);
LEVELS[15].platforms.push(plat(0,425,130,20), plat(200,425,445,20), plat(0,0,645,20), plat(0,0,20,430));
LEVELS[15].lava.push(
  plat(240,405,350,20), plat(20,20,570,20), plat(240,320,40,105), plat(240,20,40,205),
  plat(390,250,40,175), plat(390,20,40,175), plat(550,180,40,245), plat(550,20,40,105)
);
LEVELS[15].shooters.push({x:480,y:420,w:20,h:20,speed:5,rate:30,distance:650,pW:15,pH:30,up:true,down:false,right:false,left:false});
LEVELS[15].exits.push({type:2, low:0, high:450, nc:-1, level:14});
LEVELS[15].exits.push({type:1, low:0, high:450, nc:-1, level:16});

// ---- Level 16 ----
LEVELS[16] = L(20, 350, 0, 640, 0, 425);
LEVELS[16].icePlatforms.push(plat(0,405,640,40), plat(0,0,600,40), plat(600,0,40,345));
CHECKPOINTS[9] = {x:30,y:355,w:50,h:50,level:16};
LEVELS[16].instructions.push({x:90,y:355,w:50,h:50,special:0,message:[null,
  "Be careful! These are ice\nplatforms. Movement on these\nis more slippery than normal\nplatforms.\n",
  "Hint: Cancel your ice momentum\nby moving left after changing\ngravity!\n"]});
LEVELS[16].lava.push(plat(160,40,40,305), plat(260,100,40,305), plat(360,40,40,305), plat(460,100,40,305), plat(560,40,40,305));
LEVELS[16].exits.push({type:3, low:0, high:450, nc:-1, level:15});
LEVELS[16].exits.push({type:1, low:0, high:450, nc:-1, level:17});

// ---- Level 17 ----
LEVELS[17] = L(20, 350, 0, 640, 0, 425);
LEVELS[17].icePlatforms.push(
  plat(0,405,640,40), plat(0,0,600,40), plat(600,0,40,345), plat(0,0,40,345),
  plat(300,135,40,270), plat(120,135,400,40), plat(120,390,20,20)
);
LEVELS[17].healthGates.push({x:40,y:135,w:80,h:40,minHealth:10,visible:true}, {x:520,y:135,w:80,h:40,minHealth:10,visible:true});
LEVELS[17].items.push({x:195,y:200,w:30,h:30,type:0});
LEVELS[17].shooters.push(
  {x:195,y:420,w:30,h:30,speed:5,rate:30,distance:650,pW:15,pH:30,up:true,down:false,right:false,left:false},
  {x:415,y:420,w:30,h:30,speed:5,rate:30,distance:650,pW:15,pH:30,up:true,down:false,right:false,left:false}
);
LEVELS[17].movingLava.push({x:320,y:40,w:80,h:25,bL:140,bH:500,speed:4,type:0}, {x:420,y:110,w:80,h:25,bL:140,bH:500,speed:4,type:0});
LEVELS[17].lava.push(plat(120,175,180,25));
LEVELS[17].exits.push({type:1, low:0, high:450, nc:-1, level:18});
LEVELS[17].exits.push({type:3, low:0, high:450, nc:-1, level:16});
CHECKPOINTS[10] = {x:40,y:355,w:50,h:50,level:17};

// ---- Level 18 ----
LEVELS[18] = L(20, 350, 0, 640, 0, 425);
LEVELS[18].icePlatforms.push(
  plat(0,405,640,40), plat(0,0,600,40), plat(600,0,40,345), plat(0,0,40,345), plat(100,363,440,42)
);
LEVELS[18].lava.push(
  plat(40,40,560,20), plat(140,321,360,42), plat(180,279,280,42), plat(220,237,200,42), plat(260,195,120,42), plat(300,153,40,42)
);
LEVELS[18].shooters.push(
  {x:0,y:280,w:20,h:20,speed:5,rate:30,distance:650,pW:12,pH:24,up:false,down:false,right:true,left:false},
  {x:600,y:200,w:20,h:20,speed:5,rate:30,distance:650,pW:12,pH:24,up:false,down:false,right:false,left:true},
  {x:0,y:120,w:20,h:20,speed:5,rate:30,distance:650,pW:12,pH:24,up:false,down:false,right:true,left:false}
);
LEVELS[18].instructions.push({x:545,y:355,w:50,h:50,special:0,message:[null,
  "You are almost at the end of\nyour journey! Go to the right\nto face your final challenge...\nGood luck and don't give up!\n"]});
LEVELS[18].exits.push({type:3, low:345, high:405, nc:-1, level:17});
LEVELS[18].exits.push({type:1, low:345, high:405, nc:-1, level:19});
CHECKPOINTS[11] = {x:10,y:355,w:50,h:50,level:18};

// ---- Level 19 ----
LEVELS[19] = L(500, 60, 0, 640, 0, 425);
LEVELS[19].icePlatforms.push(
  plat(0,405,640,40), plat(0,0,640,40), plat(600,40,40,305), plat(0,40,40,305),
  plat(100,100,40,305), plat(200,40,40,355), plat(300,50,40,355), plat(400,40,40,355), plat(500,100,40,305)
);
LEVELS[19].items.push(
  {x:240,y:305,w:30,h:30,type:0},{x:270,y:235,w:30,h:30,type:0},{x:240,y:165,w:30,h:30,type:0},{x:270,y:95,w:30,h:30,type:0},
  {x:370,y:305,w:30,h:30,type:0},{x:340,y:235,w:30,h:30,type:0},{x:370,y:165,w:30,h:30,type:0},{x:340,y:95,w:30,h:30,type:0}
);
LEVELS[19].lava.push(plat(40,40,60,20), plat(140,180,20,40), plat(180,300,20,40), plat(480,180,20,40), plat(440,300,20,40));
LEVELS[19].shooters.push(
  {x:100,y:100,w:30,h:30,speed:7,rate:28,distance:100,pW:15,pH:30,up:false,down:false,right:false,left:true},
  {x:0,y:300,w:30,h:30,speed:7,rate:28,distance:100,pW:15,pH:30,up:false,down:false,right:true,left:false},
  {x:500,y:100,w:30,h:30,speed:7,rate:28,distance:100,pW:15,pH:30,up:false,down:false,right:true,left:false},
  {x:600,y:300,w:30,h:30,speed:7,rate:28,distance:90,pW:15,pH:30,up:false,down:false,right:false,left:true}
);
LEVELS[19].movingLava.push(
  {x:40,y:140,w:15,h:40,bL:140,bH:300,speed:4,type:1}, {x:85,y:260,w:15,h:40,bL:140,bH:300,speed:4,type:1},
  {x:140,y:140,w:60,h:40,bL:0,bH:360,speed:2,type:1}, {x:140,y:340,w:60,h:40,bL:100,bH:460,speed:2,type:1},
  {x:585,y:140,w:15,h:40,bL:140,bH:300,speed:4,type:1}, {x:540,y:260,w:15,h:40,bL:140,bH:300,speed:4,type:1},
  {x:440,y:320,w:60,h:40,bL:0,bH:360,speed:2,type:1}, {x:440,y:320,w:60,h:40,bL:100,bH:460,speed:2,type:1}
);
LEVELS[19].exits.push({type:3, low:345, high:405, nc:-1, level:18});
LEVELS[19].exits.push({type:1, low:345, high:405, nc:-1, level:20});
CHECKPOINTS[12] = {x:10,y:355,w:50,h:50,level:19};

// ---- Level 20 ----
LEVELS[20] = L(20, 350, 0, 640, 0, 425);
LEVELS[20].platforms.push(plat(0,405,640,40), plat(0,0,640,40), plat(600,40,40,305), plat(0,40,40,305));
LEVELS[20].lava.push(plat(600,305,40,40), plat(520,0,40,40), plat(120,0,40,40), plat(0,305,40,40));
LEVELS[20].powerups.push(
  {x:600,y:225,w:40,h:40,type:2},{x:600,y:145,w:40,h:40,type:1},{x:600,y:65,w:40,h:40,type:0},
  {x:440,y:0,w:40,h:40,type:2},{x:360,y:0,w:40,h:40,type:1},{x:280,y:0,w:40,h:40,type:0},
  {x:40,y:0,w:40,h:40,type:2},{x:0,y:65,w:40,h:40,type:1},{x:0,y:145,w:40,h:40,type:0}
);
LEVELS[20].icePlatforms.push(plat(600,0,40,40), plat(200,0,40,40), plat(0,225,40,40));
for (let i = 0; i < 7; i++) for (let j = 0; j < 4; j++) LEVELS[20].items.push({x:60+80*i, y:285-60*j, w:30, h:30, type:0});
for (let j = 0; j < 3; j++) LEVELS[20].movingPlatforms.push({x:80, y:260-60*j, w:40, h:20, bL:80, bH:560, speed:5, type:0});
CHECKPOINTS[13] = {x:50,y:355,w:50,h:50,level:20};
CHECKPOINTS[14] = {x:100,y:355,w:50,h:50,level:20};
CHECKPOINTS[15] = {x:150,y:355,w:50,h:50,level:20};
CHECKPOINTS[16] = {x:200,y:355,w:50,h:50,level:20};
CHECKPOINTS[17] = {x:250,y:355,w:50,h:50,level:20};
LEVELS[20].instructions.push({x:300,y:355,w:50,h:50,special:0,message:[null,
  "Congratulations! You have\ncompleted your journey!\nGo to the right to finish\nthe game and see your stats!\n"]});
CHECKPOINTS[18] = {x:350,y:355,w:50,h:50,level:20};
CHECKPOINTS[19] = {x:400,y:355,w:50,h:50,level:20};
CHECKPOINTS[20] = {x:450,y:355,w:50,h:50,level:20};
CHECKPOINTS[21] = {x:500,y:355,w:50,h:50,level:20};
CHECKPOINTS[22] = {x:550,y:355,w:50,h:50,level:20};
LEVELS[20].exits.push({type:1, low:0, high:405, nc:-1, level:0});
LEVELS[20].exits.push({type:3, low:345, high:405, nc:-1, level:19});

const LEVEL_COUNT = 20;
const CP_COUNT = 22;
