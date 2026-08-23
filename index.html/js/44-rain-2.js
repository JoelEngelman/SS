/* ============================================================
   RAIN
   ============================================================ */

function drawRain(){

  if(tunnelMode)return;

  ctx.save();

  ctx.strokeStyle=
    "rgba(190,225,220,.17)";

  ctx.lineWidth=1;


  for(const r of rain){

    ctx.beginPath();

    ctx.moveTo(
      r.x,
      r.y
    );

    ctx.lineTo(
      r.x+r.drift,
      r.y+r.length
    );

    ctx.stroke();


    r.y+=r.speed;
    r.x+=r.drift;


    if(r.y>H+30){

      r.y=-30;
      r.x=Math.random()*W;

    }


    if(r.x<-20)
      r.x=W+20;

    if(r.x>W+20)
      r.x=-20;

  }

  ctx.restore();

}
