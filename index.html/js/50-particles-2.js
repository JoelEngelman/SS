/* ============================================================
   PARTICLES
   ============================================================ */

function drawParticles(){

  particles.forEach(q=>{

    ctx.globalAlpha=
      Math.max(
        0,
        q.life/40
      );

    ctx.fillStyle=
      q.type==="energy"
        ? "#b9efc8"
        : "#ccd8d3";

    ctx.fillRect(
      q.x,
      q.y,
      4,
      4
    );

  });

  ctx.globalAlpha=1;

}
