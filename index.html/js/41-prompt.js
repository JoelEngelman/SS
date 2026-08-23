/* ============================================================
   PROMPT
   ============================================================ */

function updatePrompt(){

  if(
    !gameStarted ||
    cutsceneActive
  ){

    prompt.classList.remove(
      "show"
    );

    return;

  }


  if(tunnelMode){

    if(
      stage===11 &&
      player.x>4500 &&
      player.x<6000
    ){

      prompt.textContent=
        "Press E to speak with the survivors";

      prompt.classList.add(
        "show"
      );

      return;

    }


    if(
      stage===13 &&
      player.x>7900
    ){

      prompt.textContent=
        "Press E to use the maintenance lift";

      prompt.classList.add(
        "show"
      );

      return;

    }


    if(
      stage===10 &&
      player.x>700
    ){

      prompt.textContent=
        "Keep exploring";

      prompt.classList.add(
        "show"
      );

      return;

    }


    if(
      nearestAnchor()
    ){

      prompt.textContent=
        player.grapple
          ? "Release E to launch"
          : "Hold E to grapple";

      prompt.classList.add(
        "show"
      );

      return;

    }


    prompt.classList.remove(
      "show"
    );

    return;

  }


  const c=nearestComponent();

  if(c){

    prompt.textContent=
      "Press E to collect component";

    prompt.classList.add(
      "show"
    );

    return;

  }


  const o=nearestObject();

  if(o){

    if(
      o.type==="tower"
    ){

      prompt.textContent=
        "Press E to activate transmitter";

    }
    else if(
      o.type==="transit"
    ){

      prompt.textContent=
        "Press E to enter underground transit";

    }
    else if(
      o.type==="cave"
    ){

      prompt.textContent=
        "Press E to investigate";

    }
    else if(
      o.type==="return"
    ){

      prompt.textContent=
        "Press E to speak to the leader";

    }
    else{

      prompt.textContent=
        "Press E to interact";

    }

    prompt.classList.add(
      "show"
    );

    return;

  }


  if(nearestAnchor()){

    prompt.textContent=
      player.grapple
        ? "Release E to launch"
        : "Hold E to grapple";

    prompt.classList.add(
      "show"
    );

    return;

  }


  prompt.classList.remove(
    "show"
  );

}
