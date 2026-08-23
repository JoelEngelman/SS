/* ============================================================
   SCRAP
   ============================================================ */

const scraps=[];

function addScrapOnPlatform(p,count){

  for(let i=0;i<count;i++){

    scraps.push({

      x:p.x+
        40+
        Math.random()*
        Math.max(20,p.w-80),

      y:p.y-12,

      collected:false

    });

  }

}

for(const p of platforms){

  if(p.w>=250){

    addScrapOnPlatform(
      p,
      Math.max(2,Math.floor(p.w/180))
    );

  }

}
