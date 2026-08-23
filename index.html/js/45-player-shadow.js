/* ============================================================
   PLAYER SHADOW
   ============================================================ */

function drawPlayerShadow(){

  const centerX=
    player.x+
    player.w/2;

  let groundY=700;

  const list=
    tunnelMode
      ? tunnelPlatforms
      : platforms;


  for(const p of list){

    if(

      centerX>=p.x &&

      centerX<=p.x+p.w &&

      p.y>=
        player.y+
        player.h-
        2

    ){

      if(p.y<groundY)
        groundY=p.y;

    }

  }


  const height=
    Math.max(
      0,
      groundY-
      (player.y+player.h)
    );


  const scale=
    Math.max(
      .18,
      1-height/330
    );


  ctx.save();

  ctx.globalAlpha=
    .25*scale;

  ctx.fillStyle="#000";


  ctx.beginPath();

  ctx.ellipse(
    centerX,
    groundY+3,
    22*scale,
    5*scale,
    0,
    0,
    Math.PI*2
  );

  ctx.fill();

  ctx.restore();

}
