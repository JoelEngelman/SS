/* ============================================================
   PROGRESSION
   ============================================================ */

function progress(){

  if(interactionLock>0)
    interactionLock--;


  if(tunnelMode){

    tunnelProgress();

    return;

  }


  if(
    stage===2 &&
    player.x>1500
  ){

    stage=3;

    objects.find(
      o=>o.type==="radio"
    ).active=true;

    objective();

    say(
      "MARA",
      "There. An old radio room. Maybe they left the next piece behind."
    );

  }


  if(
    stage===4 &&
    player.x>2600
  ){

    if(!progress.warned){

      progress.warned=true;

      say(
        "MARA",
        "The storm is getting stronger. The transmitter tower is ahead."
      );

    }

  }


  if(
    stage===5 &&
    components>=3
  ){

    objects.find(
      o=>o.type==="tower"
    ).active=true;

  }


  if(
    stage===6 &&
    player.x>4050
  ){

    objects.find(
      o=>o.type==="settlement"
    ).active=true;

  }


  if(
    stage===6 &&
    player.x>4300
  ){

    stage=7;

    objects.find(
      o=>o.type==="settlement"
    ).active=true;

    setCheckpoint(
      4300,
      470-player.h
    );

    objective();

    say(
      "LEADER",
      "Mara! Over here!"
    );

  }


  if(
    stage===8 &&
    player.x>5500
  ){

    objects.find(
      o=>o.type==="transit"
    ).active=true;

    objective();

  }


  if(
    stage===8 &&
    player.x>6000
  ){

    stage=9;

    setCheckpoint(
      6100,
      520-player.h
    );

    objective();

    say(
      "LEADER",
      "The transit entrance is ahead. Our people disappeared down there."
    );

  }


  if(
    stage===9 &&
    player.x>6500
  ){

    stage=10;

    setCheckpoint(
      6750,
      530-player.h
    );

    objects.find(
      o=>o.type==="cave"
    ).active=true;

    objective();

    say(
      "MARA",
      "If they're alive, I'm bringing them home."
    );

  }

}
