/* ============================================================
   ADVANCE CUTSCENE
   ============================================================ */

function advanceCutscene(){

  if(!cutsceneActive)return;

  clearInterval(cutTimer);

  cutIndex++;

  if(
    cutIndex>=cutLines.length
  ){

    if(cutMode==="transmitter")
      endTransmitterCutscene();

    else if(cutMode==="cave")
      endCaveCutscene();

    else if(cutMode==="survivors")
      endSurvivorCutscene();

    else if(cutMode==="leader")
      endLeaderCutscene();

    else if(cutMode==="tunnel")
      endTunnelIntro();

  }
  else{

    showCut();

    cutTimer=setInterval(()=>{

      if(!cutsceneActive)return;

      cutIndex++;

      if(
        cutIndex>=cutLines.length
      ){

        if(cutMode==="transmitter")
          endTransmitterCutscene();

        else if(cutMode==="cave")
          endCaveCutscene();

        else if(cutMode==="survivors")
          endSurvivorCutscene();

        else if(cutMode==="leader")
          endLeaderCutscene();

        else if(cutMode==="tunnel")
          endTunnelIntro();

      }
      else{

        showCut();

      }

    },2800);

  }

}
