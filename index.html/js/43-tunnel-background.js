/* ============================================================
   TUNNEL BACKGROUND
   ============================================================ */

function drawTunnelBackground(){

  const g=ctx.createLinearGradient(
    0,
    0,
    0,
    H
  );

  g.addColorStop(
    0,
    "#020609"
  );

  g.addColorStop(
    .45,
    "#0b171a"
  );

  g.addColorStop(
    1,
    "#03080a"
  );

  ctx.fillStyle=g;

  ctx.fillRect(
    0,
    0,
    W,
    H
  );


  /* distant tunnel walls */

  ctx.save();

  const offset=camX*.25;


  for(
    let i=-2;
    i<30;
    i++
  ){

    const x=i*420-offset;

    ctx.fillStyle=
      "rgba(25,43,46,.4)";

    ctx.fillRect(
      x,
      80,
      340,
      360
    );


    ctx.strokeStyle=
      "rgba(90,125,120,.12)";

    ctx.lineWidth=5;

    ctx.strokeRect(
      x,
      80,
      340,
      360
    );


    ctx.fillStyle=
      "rgba(170,225,200,.08)";

    ctx.fillRect(
      x+40,
      150,
      160,
      4
    );

    ctx.fillRect(
      x+40,
      170,
      100,
      4
    );

  }

  ctx.restore();


  /* ceiling */

  ctx.fillStyle=
    "rgba(0,0,0,.55)";

  ctx.fillRect(
    0,
    0,
    W,
    90
  );


  /* dust particles */

  for(
    let i=0;
    i<70;
    i++
  ){

    const x=
      ((i*173-worldTime*.015)%W+W)%W;

    const y=
      90+
      ((i*71)%Math.max(1,H-150));

    ctx.fillStyle=
      "rgba(190,220,210,.08)";

    ctx.fillRect(
      x,
      y,
      2,
      2
    );

  }

}
