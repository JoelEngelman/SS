/* ============================================================
   UPDATE
   ============================================================ */

function update(){

  if(!gameStarted)return;

  worldTime+=16;

  move();

  collectScrap();

  progress();


  const targetX=
    player.x-
    W*.35;

  const targetY=
    player.y-
    H*.55;


  camX+=
    (targetX-camX)*
    .09;

  camY+=
    (targetY-camY)*
    .07;


  if(tunnelMode){

    camX=Math.max(
      -100,
      Math.min(
        8500,
        camX
      )
    );

    camY=Math.max(
      -300,
      Math.min(
        250,
        camY
      )
    );

  }
  else{

    camX=Math.max(
      -100,
      Math.min(
        12100,
        camX
      )
    );

    camY=Math.max(
      -250,
      Math.min(
        180,
        camY
      )
    );

  }


  staminaEl.style.width=
    player.stamina+"%";

  scrapEl.textContent=
    scrap;

  componentsEl.textContent=
    components+"/3";


  updatePrompt();


  particles.forEach(q=>{

    q.x+=q.vx;
    q.y+=q.vy;

    q.vy+=.08;

    q.life--;

  });


  particles=
    particles.filter(
      q=>q.life>0
    );

}
