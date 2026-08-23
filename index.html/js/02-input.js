/* ============================================================
   INPUT
   ============================================================ */

const keys={};

let jumpPressed=false;
let ePressed=false;

addEventListener("keydown",e=>{

  const k=e.key.toLowerCase();

  keys[k]=true;

  if(
    [" ","arrowup","arrowdown","arrowleft","arrowright"].includes(k)
  ){
    e.preventDefault();
  }

  if(k==="r" && gameStarted){
    respawn();
  }

  if(
    cutsceneActive &&
    (k==="enter" || k==="e")
  ){
    e.preventDefault();
    advanceCutscene();
  }

});

addEventListener("keyup",e=>{

  keys[e.key.toLowerCase()]=false;

});
