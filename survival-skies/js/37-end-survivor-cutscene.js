/* ============================================================
   END SURVIVOR CUTSCENE
   ============================================================ */

function endSurvivorCutscene(){

  clearInterval(cutTimer);

  cutsceneActive=false;

  cutscene.classList.remove(
    "show",
    "tunnelScene"
  );

  stage=12;

  setCheckpoint(
    5100,
    500-player.h
  );

  gameStarted=true;

  objective();

  say(
    "MARA",
    "Everyone stays together. We're finding that shaft."
  );

}
