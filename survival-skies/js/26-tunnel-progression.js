/* ============================================================
   TUNNEL PROGRESSION
   ============================================================ */

function tunnelProgress(){

  /* TRAPPED */

  if(
    stage===10 &&
    player.x>800
  ){

    if(!tunnelProgress.trapped){

      tunnelProgress.trapped=true;

      say(
        "MARA",
        "The entrance collapsed behind me..."
      );

      setCheckpoint(
        100,
        570-player.h
      );

    }

  }


  /* FIND SURVIVORS */

  if(
    stage===11 &&
    player.x>4700 &&
    !tunnelProgress.foundPeople
  ){

    tunnelProgress.foundPeople=true;

    objects.find(
      o=>o.type==="survivors"
    ).active=true;

  }


  /* SURVIVORS TELL MARA TO FIND THE SHAFT */

  if(
    stage===12 &&
    player.x>6100
  ){

    stage=13;

    setCheckpoint(
      6250,
      510-player.h
    );

    objective();

    say(
      "SCAVENGER",
      "The maintenance lift is further east."
    );

  }


  /* EXIT */

  if(
    stage===13 &&
    player.x>8050
  ){

    escapeTunnel();

  }

}
