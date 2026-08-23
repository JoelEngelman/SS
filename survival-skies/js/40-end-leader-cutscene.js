/* ============================================================
   END LEADER CUTSCENE
   ============================================================ */

function endLeaderCutscene(){

  clearInterval(cutTimer);

  cutsceneActive=false;

  cutscene.classList.remove(
    "show"
  );

  stage=15;

  gameStarted=true;

  objective();

  say(
    "LEADER",
    "We need to prepare before we go anywhere near that facility."
  );

  setTimeout(()=>{

    say(
      "MARA",
      "Then this isn't the end."
    );

  },2800);

}
