/* ============================================================
   WORLD DRAW
   ============================================================ */

function draw(){

  ctx.clearRect(
    0,
    0,
    W,
    H
  );


  drawBackground();


  ctx.save();

  ctx.translate(
    -camX,
    -camY
  );


  if(tunnelMode){

    drawTunnelWorld();

  }
  else{

    drawSurfaceWorld();

  }


  ctx.restore();


  /* VIGNETTE */

  const v=
    ctx.createRadialGradient(
      W/2,
      H/2,
      100,
      W/2,
      H/2,
      Math.max(W,H)*.7
    );

  v.addColorStop(
    0,
    "transparent"
  );

  v.addColorStop(
    1,
    "rgba(0,0,0,.45)"
  );

  ctx.fillStyle=v;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  drawRain();

}
