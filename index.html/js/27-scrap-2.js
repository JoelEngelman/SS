/* ============================================================
   SCRAP
   ============================================================ */

function collectScrap(){

  if(tunnelMode)return;

  for(const s of scraps){

    if(s.collected)continue;

    if(

      Math.abs(
        player.x-s.x
      )<48 &&

      Math.abs(
        player.y+player.h-s.y
      )<65

    ){

      s.collected=true;

      scrap++;

      spawn(
        s.x,
        s.y,
        8,
        "energy"
      );

    }

  }

}
