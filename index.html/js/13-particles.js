/* ============================================================
   PARTICLES
   ============================================================ */

function spawn(x,y,n=8,type="dust"){

  for(let i=0;i<n;i++){

    particles.push({

      x,
      y,

      vx:(Math.random()-.5)*5,

      vy:(Math.random()-.7)*5,

      life:30+Math.random()*25,

      type

    });

  }

}
