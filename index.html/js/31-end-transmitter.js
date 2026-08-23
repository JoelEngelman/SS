/* ============================================================
   END TRANSMITTER
   ============================================================ */

function endTransmitterCutscene(){

  clearInterval(cutTimer);

  cutsceneActive=false;

  cutscene.classList.remove(
    "show"
  );

  stage=6;

  player.x=4010;
  player.y=500-player.h;

  player.spawnX=4010;
  player.spawnY=500-player.h;

  player.vx=0;
  player.vy=0;

  player.grounded=true;
  player.grapple=null;

  camX=3700;
  camY=0;

  objects.find(
    o=>o.type==="settlement"
  ).active=true;

  gameStarted=true;

  objective();

  say(
    "MARA",
    "They're alive. Follow the lights."
  );

}
