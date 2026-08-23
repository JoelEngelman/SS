/* ============================================================
   CAVE TRAP
   ============================================================ */

function triggerCaveTrap(){

  gameStarted=false;

  cutsceneActive=true;

  cutMode="cave";

  cutscene.classList.add(
    "show"
  );

  const lines=[

    [
      "MARA",
      "Hello? Anyone down here?"
    ],

    [
      "MARA",
      "...Wait."
    ],

    [
      "MARA",
      "That wasn't the wind."
    ],

    [
      "SURVIVOR",
      "DON'T MOVE!"
    ],

    [
      "MARA",
      "Who are you?"
    ],

    [
      "SURVIVOR",
      "The floor. It's unstable."
    ],

    [
      "MARA",
      "Oh no—"
    ],

    [
      "SURVIVOR",
      "RUN!"
    ],

    [
      "MARA",
      "..."
    ],

    [
      "SURVIVOR",
      "Mara? Are you alive?"
    ],

    [
      "MARA",
      "I'm trapped."
    ],

    [
      "SURVIVOR",
      "So are we."
    ],

    [
      "MARA",
      "How many of you are there?"
    ],

    [
      "SURVIVOR",
      "Six."
    ],

    [
      "MARA",
      "Then we're getting all seven of us out."
    ]

  ];

  cutLines=lines;

  cutIndex=0;

  showCut();

  clearInterval(cutTimer);

  cutTimer=setInterval(()=>{

    if(!cutsceneActive)return;

    cutIndex++;

    if(
      cutIndex>=cutLines.length
    ){

      endCaveCutscene();

    }
    else{

      showCut();

    }

  },2200);

}
