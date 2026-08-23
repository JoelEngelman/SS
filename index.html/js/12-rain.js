/* ============================================================
   RAIN
   ============================================================ */

for(let i=0;i<300;i++){

  rain.push({

    x:Math.random()*W,

    y:Math.random()*H,

    speed:9+Math.random()*8,

    length:10+Math.random()*15,

    drift:-1.5+Math.random()

  });

}
