/* ============================================================
   NEAREST TUNNEL ANCHOR
   ============================================================ */

function nearestAnchor(){

  const list=tunnelMode
    ? tunnelAnchors
    : anchors;

  let best=null;
  let bd=player.grappleRange;

  for(const a of list){

    const d=Math.hypot(
      player.x-a.x,
      player.y-a.y
    );

    if(
      d<bd &&
      a.y<player.y+180
    ){

      bd=d;
      best=a;

    }

  }

  return best;

}
