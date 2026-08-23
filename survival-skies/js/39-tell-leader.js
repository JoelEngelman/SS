/* ============================================================
   TELL LEADER
   ============================================================ */

function tellLeader(){

  if(
    stage!==14 ||
    leaderHasBeenTold
  )return;


  gameStarted=false;

  cutsceneActive=true;

  cutMode="leader";

  leaderHasBeenTold=true;

  cutscene.classList.remove(
    "tunnelScene"
  );

  cutscene.classList.add(
    "show"
  );


  cutLines=[

    [
      "MARA",
      "We found six people underground."
    ],

    [
      "LEADER",
      "Six?"
    ],

    [
      "MARA",
      "They're alive. They survived the Collapse down there."
    ],

    [
      "LEADER",
      "What did they tell you?"
    ],

    [
      "MARA",
      "The Collapse wasn't an accident."
    ],

    [
      "LEADER",
      "I always knew it."
    ],

    [
      "MARA",
      "They found a powered facility beneath the transit system."
    ],

    [
      "LEADER",
      "The old control station..."
    ],

    [
      "MARA",
      "You know it?"
    ],

    [
      "LEADER",
      "My father used to talk about it."
    ],

    [
      "MARA",
      "What was it?"
    ],

    [
      "LEADER",
      "A system designed to control the floating city's stabilisers."
    ],

    [
      "MARA",
      "Then the Collapse could have been triggered."
    ],

    [
      "LEADER",
      "Not could have."
    ],

    [
      "LEADER",
      "It was."
    ],

    [
      "MARA",
      "Who did it?"
    ],

    [
      "LEADER",
      "That's the part nobody knows."
    ],

    [
      "MARA",
      "Then we go back."
    ],

    [
      "LEADER",
      "Mara..."
    ],

    [
      "LEADER",
      "If that facility is still powered, someone may still be using it."
    ],

    [
      "MARA",
      "Then we find them."
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

      endLeaderCutscene();

    }
    else{

      showCut();

    }

  },2600);

}
