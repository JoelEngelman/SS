/* ============================================================
   ENTER TUNNEL
   ============================================================ */

function enterTunnel(){

  if(
    tunnelMode
  )return;

  if(
    stage!==8 &&
    stage!==9
  )return;


  gameStarted=false;

  tunnelMode=true;

  cutsceneActive=true;

  cutMode="tunnel";

  cutscene.classList.add(
    "tunnelScene",
    "show"
  );


  cutLines=[

    [
      "MARA",
      "This place is older than the city."
    ],

    [
      "LEADER",
      "Our people followed a signal down here."
    ],

    [
      "MARA",
      "And they never came back."
    ],

    [
      "LEADER",
      "Be careful."
    ],

    [
      "MARA",
      "I'll find them."
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

      endTunnelIntro();

    }
    else{

      showCut();

    }

  },2400);

}
