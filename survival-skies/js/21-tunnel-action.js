/* ============================================================
   TUNNEL ACTION
   ============================================================ */

function tunnelAction(){

  if(stage===10){

    if(player.x>1200){

      stage=11;

      objective();

      say(
        "MARA",
        "There's someone deeper in here. I can hear them."
      );

    }

    return;

  }


  if(stage===11){

    if(
      player.x>4700 &&
      player.x<6000
    ){

      triggerSurvivorCutscene();

    }

    return;

  }


  if(stage===12){

    if(player.x>6000){

      stage=13;

      objective();

      say(
        "MARA",
        "That shaft... that's our way out."
      );

    }

    return;

  }


  if(stage===13){

    if(player.x>8050){

      escapeTunnel();

    }

    return;

  }

}
