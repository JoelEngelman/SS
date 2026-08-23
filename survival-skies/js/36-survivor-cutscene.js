/* ============================================================
   SURVIVOR CUTSCENE
   ============================================================ */

function triggerSurvivorCutscene(){

  if(!tunnelMode)return;

  gameStarted=false;

  cutsceneActive=true;

  cutMode="survivors";

  cutscene.classList.add(
    "tunnelScene",
    "show"
  );


  cutLines=[

    [
      "MARA",
      "You're the people from the radio."
    ],

    [
      "SCAVENGER",
      "And you're Mara."
    ],

    [
      "MARA",
      "How does everyone know my name?"
    ],

    [
      "SCAVENGER",
      "Because your signal wasn't the first."
    ],

    [
      "MARA",
      "What do you mean?"
    ],

    [
      "SCAVENGER",
      "Someone transmitted from beneath the city."
    ],

    [
      "MARA",
      "The Collapse?"
    ],

    [
      "SCAVENGER",
      "It wasn't natural."
    ],

    [
      "MARA",
      "Then what happened?"
    ],

    [
      "SCAVENGER",
      "The city was shut down deliberately."
    ],

    [
      "MARA",
      "By who?"
    ],

    [
      "SCAVENGER",
      "We don't know."
    ],

    [
      "SCAVENGER",
      "But we found a facility below the transit system."
    ],

    [
      "MARA",
      "What kind of facility?"
    ],

    [
      "SCAVENGER",
      "A control station."
    ],

    [
      "SCAVENGER",
      "It was still powered."
    ],

    [
      "MARA",
      "What did you find inside?"
    ],

    [
      "SCAVENGER",
      "Records."
    ],

    [
      "MARA",
      "Records of what?"
    ],

    [
      "SCAVENGER",
      "The day the sky cities fell."
    ],

    [
      "MARA",
      "Then we need to get out."
    ],

    [
      "SCAVENGER",
      "There's a maintenance shaft further east."
    ],

    [
      "SCAVENGER",
      "If we reach it, we can get everyone back to the surface."
    ],

    [
      "MARA",
      "Then stay close."
    ],

    [
      "SCAVENGER",
      "We have six people."
    ],

    [
      "MARA",
      "Then I'm getting six people home."
    ]

  ];


  cutIndex=0;

  showCut();

  clearInterval(cutTimer);

  cutTimer=setInterval(()=>{

    if(!cutsceneActive)return;

    cutIndex++;

    if(
      cutIndex>=cutLines.length
    ){

      endSurvivorCutscene();

    }
    else{

      showCut();

    }

  },2400);

}
