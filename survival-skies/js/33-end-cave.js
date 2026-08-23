/* ============================================================
   END CAVE
   ============================================================ */

function endCaveCutscene(){

  clearInterval(cutTimer);

  cutscene.classList.remove(
    "show"
  );

  cutsceneActive=false;

  tunnelMode=true;

  stage=10;

  player.x=100;
  player.y=570-player.h;

  player.spawnX=100;
  player.spawnY=570-player.h;

  player.vx=0;
  player.vy=0;

  player.grounded=true;

  player.grapple=null;

  camX=0;
  camY=0;

  gameStarted=true;

  objective();

  say(
    "MARA",
    "The entrance is gone. We're trapped underground."
  );

}
