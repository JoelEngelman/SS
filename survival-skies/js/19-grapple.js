/* ============================================================
   GRAPPLE
   ============================================================ */

function grapple(){

  const a=nearestAnchor();

  if(!a)return;

  player.grapple=a;

  spawn(
    player.x,
    player.y,
    18,
    "energy"
  );

}


function releaseGrapple(launch=true){

  if(!player.grapple)return;

  const a=player.grapple;

  const dx=a.x-player.x;
  const dy=a.y-player.y;

  const d=Math.hypot(dx,dy)||1;

  player.grapple=null;

  if(launch){

    player.vx+=(dx/d)*6;
    player.vy+=(dy/d)*5;

  }

}


function applyGrapple(){

  if(!player.grapple)return;

  const a=player.grapple;

  const dx=a.x-player.x;
  const dy=a.y-player.y;

  const d=Math.hypot(dx,dy)||1;

  if(d<42){

    player.vx*=.5;
    player.vy*=.5;

    return;

  }

  player.vx+=(dx/d)*player.grapplePower;
  player.vy+=(dy/d)*player.grapplePower;

  const maxGrappleSpeed=15;

  player.vx=Math.max(
    -maxGrappleSpeed,
    Math.min(maxGrappleSpeed,player.vx)
  );

  player.vy=Math.max(
    -maxGrappleSpeed,
    Math.min(maxGrappleSpeed,player.vy)
  );

  if(!keys.e)
    releaseGrapple(true);

}
