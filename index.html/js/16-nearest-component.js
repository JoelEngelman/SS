/* ============================================================
   NEAREST COMPONENT
   ============================================================ */

function nearestComponent(){

  let best=null;
  let bd=95;

  items.forEach((it,i)=>{

    if(it.collected)return;

    let valid=false;

    if(i===0 && stage===1)
      valid=true;

    if(i===1 && stage===3)
      valid=true;

    if(i===2 && stage===4)
      valid=true;

    if(!valid)return;

    const d=Math.hypot(
      player.x-it.x,
      player.y-it.y
    );

    if(d<bd){

      bd=d;
      best=it;

    }

  });

  return best;

}
