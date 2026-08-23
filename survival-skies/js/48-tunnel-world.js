/* ============================================================
   TUNNEL WORLD
   ============================================================ */

function drawTunnelWorld(){

  /* ceiling */

  ctx.fillStyle="#050a0c";

  ctx.fillRect(
    -500,
    0,
    9500,
    100
  );


  /* tunnel walls */

  for(
    let x=-300;
    x<9000;
    x+=280
  ){

    const wobble=
      Math.sin(x*.03)*20;

    ctx.fillStyle=
      "#111e21";

    ctx.beginPath();

    ctx.moveTo(
      x,
      100+wobble
    );

    ctx.lineTo(
      x+240,
      100+wobble
    );

    ctx.lineTo(
      x+270,
      620
    );

    ctx.lineTo(
      x,
      620
    );

    ctx.closePath();

    ctx.fill();


    ctx.strokeStyle=
      "rgba(80,115,110,.2)";

    ctx.lineWidth=3;

    ctx.stroke();


    /* pipes */

    ctx.strokeStyle=
      "rgba(105,145,135,.18)";

    ctx.lineWidth=10;

    ctx.beginPath();

    ctx.moveTo(
      x+60,
      120
    );

    ctx.lineTo(
      x+60,
      500
    );

    ctx.stroke();


    ctx.strokeStyle=
      "rgba(190,230,210,.12)";

    ctx.lineWidth=3;

    ctx.beginPath();

    ctx.moveTo(
      x+100,
      160
    );

    ctx.lineTo(
      x+220,
      160
    );

    ctx.stroke();

  }


  /* platforms */

  tunnelPlatforms.forEach((p,i)=>{

    ctx.fillStyle=
      i%2
        ? "#25373a"
        : "#1d3034";

    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      p.h
    );


    ctx.fillStyle=
      "#566d68";

    ctx.fillRect(
      p.x,
      p.y,
      p.w,
      5
    );


    /* cracks */

    for(
      let x=p.x+40;
      x<p.x+p.w-20;
      x+=100
    ){

      ctx.strokeStyle=
        "rgba(0,0,0,.4)";

      ctx.lineWidth=2;

      ctx.beginPath();

      ctx.moveTo(
        x,
        p.y+12
      );

      ctx.lineTo(
        x+15,
        p.y+30
      );

      ctx.lineTo(
        x-5,
        p.y+50
      );

      ctx.stroke();

    }

  });


  /* old lights */

  for(
    let x=100;
    x<8500;
    x+=210
  ){

    const active=
      Math.sin(
        x*.17+
        worldTime*.004
      )>.15;

    ctx.fillStyle=
      active
        ? "rgba(185,239,200,.6)"
        : "rgba(100,130,125,.15)";

    ctx.shadowBlur=
      active
        ? 18
        : 0;

    ctx.shadowColor=
      "#b9efc8";

    ctx.fillRect(
      x,
      185,
      34,
      6
    );

    ctx.shadowBlur=0;

  }


  /* danger signs */

  for(
    let x=900;
    x<8000;
    x+=700
  ){

    ctx.fillStyle=
      "rgba(180,90,70,.18)";

    ctx.fillRect(
      x,
      250,
      80,
      30
    );

    ctx.fillStyle=
      "rgba(220,130,100,.5)";

    ctx.fillRect(
      x+15,
      262,
      50,
      3
    );

  }


  /* survivor camp */

  if(stage>=11){

    ctx.fillStyle=
      "rgba(120,170,150,.08)";

    ctx.fillRect(
      4850,
      360,
      900,
      210
    );


    /* tents */

    for(
      let i=0;
      i<6;
      i++
    ){

      const x=
        5000+
        i*110;

      ctx.fillStyle="#263b3c";

      ctx.beginPath();

      ctx.moveTo(
        x,
        500
      );

      ctx.lineTo(
        x+50,
        410
      );

      ctx.lineTo(
        x+100,
        500
      );

      ctx.closePath();

      ctx.fill();


      ctx.strokeStyle=
        "rgba(180,220,205,.15)";

      ctx.stroke();

    }


    /* fire */

    ctx.fillStyle=
      "#d9f8df";

    ctx.shadowBlur=30;
    ctx.shadowColor="#b9efc8";

    ctx.beginPath();

    ctx.arc(
      5350,
      470,
      14+
        Math.sin(
          worldTime*.02
        )*4,
      0,
      Math.PI*2
    );

    ctx.fill();

    ctx.shadowBlur=0;

  }


  /* maintenance shaft */

  if(stage>=12){

    ctx.fillStyle=
      "#071012";

    ctx.fillRect(
      7850,
      180,
      260,
      250
    );


    ctx.strokeStyle=
      "#829890";

    ctx.lineWidth=5;

    ctx.strokeRect(
      7850,
      180,
      260,
      250
    );


    for(
      let y=230;
      y<420;
      y+=35
    ){

      ctx.fillStyle=
        "#435a57";

      ctx.fillRect(
        7900,
        y,
        160,
        7
      );

    }


    ctx.fillStyle=
      "#b9efc8";

    ctx.shadowBlur=25;
    ctx.shadowColor="#b9efc8";

    ctx.fillRect(
      7900,
      200,
      160,
      6
    );

    ctx.shadowBlur=0;

  }


  /* exit opening */

  if(stage>=13){

    ctx.fillStyle=
      "#b9efc8";

    ctx.shadowBlur=50;
    ctx.shadowColor="#b9efc8";

    ctx.fillRect(
      8300,
      350,
      450,
      12
    );

    ctx.shadowBlur=0;


    ctx.fillStyle=
      "rgba(185,239,200,.12)";

    ctx.fillRect(
      8300,
      360,
      450,
      310
    );

  }


  /* tunnel anchors */

  tunnelAnchors.forEach(a=>{

    const pulse=
      8+
      Math.sin(
        Date.now()/180
      )*2;

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


    ctx.fillStyle=
      "#b9efc8";

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


  /* cable */

  if(player.grapple){

    ctx.strokeStyle=
      "#d6eee6";

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
