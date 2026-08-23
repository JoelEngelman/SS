/* ============================================================
   SURFACE WORLD
   ============================================================ */

function drawSurfaceWorld(){

  /* FOG */

  for(
    let i=-5;
    i<50;
    i++
  ){

    const x=i*350;

    ctx.fillStyle=
      "rgba(180,220,210,.025)";

    ctx.fillRect(
      x,
      -300,
      230,
      1100
    );

  }


  /* PLATFORMS */

  platforms.forEach((p,i)=>{

    ctx.fillStyle=
      i>=10
        ? "#263b40"
        : "#293d42";

    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      p.h
    );


    ctx.fillStyle="#60736d";

    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      5
    );


    for(
      let x=p.x+35;
      x<p.x+p.w-20;
      x+=95
    ){

      ctx.fillStyle=
        "rgba(8,18,22,.55)";

      ctx.fillRect(
        x,
        p.y+18,
        45,
        5
      );

      ctx.fillStyle=
        "rgba(160,205,190,.08)";

      ctx.fillRect(
        x+5,
        p.y+30,
        8,
        18
      );

      ctx.fillRect(
        x+20,
        p.y+30,
        8,
        18
      );

    }

  });


  /* CITY */

  if(stage>=6){

    for(
      let x=4000;
      x<6000;
      x+=180
    ){

      const h=
        110+
        (Math.floor(x/180)%4)*35;

      ctx.fillStyle="#15272c";

      ctx.fillRect(
        x,
        500-h,
        145,
        h
      );


      for(
        let y=530-h;
        y<470;
        y+=32
      ){

        ctx.fillStyle=
          "rgba(185,239,200,.12)";

        ctx.fillRect(
          x+18,
          y,
          25,
          7
        );

        ctx.fillRect(
          x+65,
          y,
          25,
          7
        );

      }

    }

  }


  /* ANCHORS */

  anchors.forEach(a=>{

    const pulse=
      9+
      Math.sin(Date.now()/180)*2;

    ctx.strokeStyle=
      player.grapple===a
        ? "rgba(220,255,240,.9)"
        : "rgba(150,240,220,.35)";

    ctx.lineWidth=
      player.grapple===a
        ? 3
        : 1;


    ctx.beginPath();

    ctx.arc(
      a.x,
      a.y,
      pulse,
      0,
      Math.PI*2
    );

    ctx.stroke();


    ctx.fillStyle="#b9efc8";

    ctx.beginPath();

    ctx.arc(
      a.x,
      a.y,
      4,
      0,
      Math.PI*2
    );

    ctx.fill();

  });


  /* SCRAP */

  scraps.forEach(s=>{

    if(s.collected)return;

    ctx.save();

    ctx.translate(
      s.x,
      s.y
    );

    ctx.rotate(
      Math.sin(
        worldTime/300+s.x
      )*.2
    );

    ctx.fillStyle="#e5c76f";

    ctx.shadowBlur=12;
    ctx.shadowColor="#e5c76f";

    ctx.fillRect(
      -6,
      -5,
      12,
      10
    );

    ctx.fillStyle="#fff1a8";

    ctx.fillRect(
      -3,
      -5,
      3,
      10
    );

    ctx.restore();

  });


  /* COMPONENTS */

  items.forEach(it=>{

    if(it.collected)return;

    ctx.fillStyle="#d9f8df";

    ctx.shadowBlur=20;
    ctx.shadowColor="#b9efc8";


    ctx.beginPath();

    ctx.arc(
      it.x,
      it.y,
      9+
        Math.sin(
          Date.now()/150
        )*2,
      0,
      Math.PI*2
    );

    ctx.fill();

    ctx.shadowBlur=0;

  });


  /* TRANSMITTER */

  ctx.fillStyle="#51686a";

  ctx.fillRect(
    3510,
    150,
    16,
    350
  );

  ctx.fillRect(
    3590,
    150,
    16,
    350
  );


  ctx.fillStyle=
    components>=3
      ? "#d9f8df"
      : "#657879";

  ctx.shadowBlur=
    components>=3
      ? 30
      : 5;

  ctx.shadowColor="#b9efc8";


  ctx.beginPath();

  ctx.arc(
    3558,
    125,
    23,
    0,
    Math.PI*2
  );

  ctx.fill();

  ctx.shadowBlur=0;


  /* SETTLEMENT LIGHTS */

  if(stage>=6){

    for(
      let i=0;
      i<55;
      i++
    ){

      const x=
        4000+
        i*70;

      const y=
        445-
        (i%4)*28;

      ctx.fillStyle=
        "rgba(185,239,200,.7)";

      ctx.shadowBlur=10;
      ctx.shadowColor="#b9efc8";


      ctx.beginPath();

      ctx.arc(
        x,
        y,
        3,
        0,
        Math.PI*2
      );

      ctx.fill();

    }

    ctx.shadowBlur=0;

  }


  /* LEADER */

  if(stage>=7){

    ctx.fillStyle="#111b1d";

    ctx.fillRect(
      4535,
      418,
      30,
      58
    );


    ctx.beginPath();

    ctx.arc(
      4550,
      405,
      16,
      0,
      Math.PI*2
    );

    ctx.fill();


    ctx.fillStyle="#b9efc8";

    ctx.fillRect(
      4558,
      402,
      7,
      3
    );

  }


  /* TRANSIT */

  if(stage>=8){

    /* huge solid entrance */

    ctx.fillStyle="#0b1417";

    ctx.fillRect(
      6030,
      270,
      340,
      250
    );


    ctx.strokeStyle=
      "#6d8580";

    ctx.lineWidth=7;

    ctx.strokeRect(
      6030,
      270,
      340,
      250
    );


    /* doorway */

    ctx.fillStyle="#020708";

    ctx.fillRect(
      6100,
      350,
      200,
      170
    );


    ctx.strokeStyle=
      "rgba(185,239,200,.55)";

    ctx.lineWidth=4;

    ctx.strokeRect(
      6100,
      350,
      200,
      170
    );


    /* sign */

    ctx.fillStyle=
      "rgba(185,239,200,.8)";

    ctx.fillRect(
      6080,
      315,
      240,
      7
    );


    ctx.fillStyle=
      "rgba(185,239,200,.4)";

    ctx.fillRect(
      6130,
      335,
      130,
      4
    );


    /* stairs */

    for(
      let i=0;
      i<7;
      i++
    ){

      ctx.fillStyle=
        "#314346";

      ctx.fillRect(
        6150+i*10,
        500-i*9,
        100-i*20,
        8
      );

    }

  }


  /* SURVIVORS */

  if(
    stage>=11 &&
    !tunnelMode
  ){

    for(
      let i=0;
      i<6;
      i++
    ){

      const x=
        9350+
        i*34;

      const y=
        454-
        (i%2)*5;

      ctx.fillStyle="#111b1d";

      ctx.fillRect(
        x,
        y,
        22,
        42
      );


      ctx.beginPath();

      ctx.arc(
        x+11,
        y-7,
        10,
        0,
        Math.PI*2
      );

      ctx.fill();

    }

  }


  /* RETURN FACILITY */

  if(stage>=14){

    ctx.fillStyle="#17282d";

    ctx.fillRect(
      11680,
      320,
      330,
      180
    );

    ctx.strokeStyle="#78918a";

    ctx.lineWidth=4;

    ctx.strokeRect(
      11680,
      320,
      330,
      180
    );


    ctx.fillStyle=
      "rgba(185,239,200,.18)";

    ctx.fillRect(
      11730,
      370,
      230,
      8
    );

    ctx.fillRect(
      11730,
      400,
      160,
      6
    );

  }


  /* GRAPPLE CABLE */

  if(player.grapple){

    ctx.strokeStyle="#d6eee6";

    ctx.lineWidth=2;

    ctx.beginPath();

    ctx.moveTo(
      player.x+14,
      player.y+20
    );

    ctx.lineTo(
      player.grapple.x,
      player.grapple.y
    );

    ctx.stroke();

  }


  drawPlayer();

  drawParticles();

}
