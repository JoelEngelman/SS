/* ============================================================
   GAME STATE
   ============================================================ */

let gameStarted=false;

let cutsceneActive=false;

let cutLines=[];
let cutIndex=0;
let cutTimer=null;
let cutMode="";

let camX=0;
let camY=0;

let scrap=0;
let components=0;

let stage=0;

let interactionLock=0;

let particles=[];
let rain=[];

let worldTime=0;

let tunnelMode=false;
let tunnelEscaped=false;

let leaderHasBeenTold=false;
