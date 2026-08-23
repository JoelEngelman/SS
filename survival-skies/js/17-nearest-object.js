/* ============================================================
   NEAREST OBJECT
   ============================================================ */

function nearestObject(){

  let best=null;
  let bd=145;

  objects.forEach(o=>{

    if(!o.active)return;

    const d=Math.hypot(
      player.x-o.x,
      player.y-o.y
    );

    if(d<bd){

      bd=d;
      best=o;

    }

  });

  return best;

}
