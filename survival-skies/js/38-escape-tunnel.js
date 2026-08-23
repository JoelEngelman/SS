/* ============================================================
   ESCAPE TUNNEL
   ============================================================ */

function escapeTunnel(){

  if(
    !tunnelMode ||
    stage!==13
  )return;


  tunnelMode=false;

  tunnelEscaped=true;

  stage=14;

  player.x=10750;
  player.y=510-player.h;

  player.spawnX=10750;
  player.spawnY=510-player.h;

  player.vx=0;
  player.vy=0;

  player.grounded=true;

  player.grapple=null;

  camX=10300;
  camY=0;

  objects.find(
    o=>o.type==="return"
  ).active=false;

  gameStarted=true;

  objective();


  say(
    "MARA",
    "We made it. Everyone's alive."
  );


  setTimeout(()=>{

    say(
      "SCAVENGER",
      "We need to warn your leader about that facility."
    );

  },2600);

}
