/* ============================================================
   TRANSMITTER CUTSCENE
   ============================================================ */

function transmitterCutscene(){

  gameStarted=false;

  cutsceneActive=true;

  cutMode="transmitter";

  cutLines=[

    [
      "MARA",
      "Hello? Is anyone receiving this?"
    ],

    [
      "SURVIVOR",
      "...Mara?"
    ],

    [
      "MARA",
      "Who is this? How do you know my name?"
    ],

    [
      "SURVIVOR",
      "Because we heard your signal. Every night."
    ],

    [
      "MARA",
      "You were here the whole time?"
    ],

    [
      "SURVIVOR",
      "We were trapped. The Collapse cut the city apart."
    ],

    [
      "MARA",
      "Then I am getting you out."
    ],

    [
      "SURVIVOR",
      "Mara... follow the lights east."
    ],

    [
      "MARA",
      "Where do they lead?"
    ],

    [
      "SURVIVOR",
      "To the people still living above the ruins."
    ]

  ];

  cutIndex=0;

  cutscene.classList.remove(
    "tunnelScene"
  );

  cutscene.classList.add(
    "show"
  );

  showCut();

  clearInterval(cutTimer);

  cutTimer=setInterval(()=>{

    if(!cutsceneActive)return;

    cutIndex++;

    if(
      cutIndex>=cutLines.length
    ){

      endTransmitterCutscene();

    }
    else{

      showCut();

    }

  },2800);

}
