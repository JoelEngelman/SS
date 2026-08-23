/* ============================================================
   END TUNNEL INTRO
   ============================================================ */

function endTunnelIntro(){

  clearInterval(cutTimer);

  cutsceneActive=false;

  cutscene.classList.remove(
    "show",
    "tunnelScene"
  );

  tunnelMode=true;

  stage=10;

  player.x=100;
  player.y=570-player.h;

  player.spawnX=100;
  player.spawnY=570-player.h;

  player.vx=0;
  player.vy=0;

  player.grounded=true;

  camX=0;
  camY=0;

  gameStarted=true;

  objective();

  say(
    "MARA",
    "The door sealed behind us."
  );

}
