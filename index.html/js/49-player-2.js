/* ============================================================
   PLAYER
   ============================================================ */

function drawPlayer(){

  drawPlayerShadow();


  ctx.save();


  const tilt=
    Math.max(
      -.08,
      Math.min(
        .08,
        player.vx*.012
      )
    );


  ctx.translate(
    player.x+14,
    player.y+24
  );

  ctx.rotate(tilt);


  /* body */

  ctx.fillStyle="#d8e8e0";

  ctx.fillRect(
    -9,
    -8,
    18,
    24
  );


  /* head */

  ctx.fillStyle="#17292e";

  ctx.beginPath();

  ctx.arc(
    0,
    -16,
    11,
    0,
    Math.PI*2
  );

  ctx.fill();


  /* visor */

  ctx.fillStyle="#b9efc8";

  ctx.fillRect(
    player.facing>0
      ? 3
      : -10,
    -18,
    7,
    3
  );


  /* backpack */

  ctx.fillStyle="#31464a";

  ctx.fillRect(
    -14,
    -6,
    5,
    17
  );


  ctx.restore();

}
