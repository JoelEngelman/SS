/* ============================================================
   START
   ============================================================ */

document.getElementById(
  "start"
).onclick=()=>{

  document.getElementById(
    "intro"
  ).classList.add(
    "hidden"
  );

  gameStarted=true;

  objective();

  say(
    "MARA",
    "The signal came from somewhere ahead. Let's find it."
  );

};
