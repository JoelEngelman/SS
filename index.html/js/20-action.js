/* ============================================================
   ACTION
   ============================================================ */

function action(){

  if(interactionLock>0)return;

  interactionLock=12;


  /* COMPONENTS ALWAYS GET PRIORITY */

  const c=nearestComponent();

  if(c){

    c.collected=true;

    components++;

    signalEl.style.width=
      (components/3*100)+"%";

    spawn(
      c.x,
      c.y,
      30,
      "energy"
    );

    if(components===1){

      stage=2;

      say(
        "MARA",
        "One piece secured. The rest of the transmitter is somewhere east."
      );

    }
    else if(components===2){

      stage=4;

      say(
        "MARA",
        "Second component. The last power core is ahead."
      );

    }
    else{

      stage=5;

      objects.find(
        o=>o.type==="tower"
      ).active=true;

      say(
        "MARA",
        "That's the last piece. The tower should answer now."
      );

    }

    objective();

    return;

  }


  /* TUNNEL MODE HAS ITS OWN INTERACTION SYSTEM */

  if(tunnelMode){

    tunnelAction();

    return;

  }


  const o=nearestObject();


  if(!o){

    if(!player.grapple)
      grapple();

    return;

  }


  switch(o.type){

    case"shelter":

      if(stage===0){

        stage=1;

        say(
          "MARA",
          "Someone was here recently. The transmitter component is still warm."
        );

        objective();

      }

    break;


    case"radio":

      if(stage===3){

        items[1].collected=true;

        components++;

        stage=4;

        signalEl.style.width=
          (components/3*100)+"%";

        spawn(
          o.x,
          o.y,
          30,
          "energy"
        );

        say(
          "MARA",
          "The second component was hidden in the radio cabinet."
        );

        objective();

      }

    break;


    case"tower":

      if(
        stage===5 &&
        components>=3
      ){

        gameStarted=false;

        say(
          "MARA",
          "Power is flowing... someone is answering.",
          1500
        );

        setTimeout(
          transmitterCutscene,
          1500
        );

      }

    break;


    case"settlement":

      if(stage===7){

        stage=8;

        say(
          "MARA",
          "I followed your signal. Who are you?"
        );

        setTimeout(()=>{

          say(
            "LEADER",
            "We're what's left of Sector 07."
          );

        },1700);

        objective();

      }

    break;


    case"transit":

      if(
        stage===8 ||
        stage===9
      ){

        enterTunnel();

      }

    break;


    case"cave":

      if(stage===10){

        triggerCaveTrap();

      }

    break;


    case"survivors":

      if(stage===11){

        triggerSurvivorCutscene();

      }

    break;


    case"return":

      if(stage===14){

        tellLeader();

      }

    break;

  }

}
