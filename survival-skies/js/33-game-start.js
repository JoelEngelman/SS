/* ============================================================
   GAME START / MAIN LOOP / FULL RENDERER
   ============================================================ */

const introScreen=document.getElementById("intro");
const startButton=document.getElementById("start");

function startGame(){
  gameStarted=true;
  cutsceneActive=false;
  tunnelMode=false;
  tunnelEscaped=false;
  stage=0;
  scrap=0;
  components=0;
  player.x=100;
  player.y=450;
  player.spawnX=100;
  player.spawnY=450;
  player.vx=0;
  player.vy=0;
  player.jumps=0;
  player.stamina=100;
  player.grapple=null;
  camX=0;
  camY=0;
  signalEl.style.width="0%";
  scrapEl.textContent="0";
  componentsEl.textContent="0/3";
  objective();
  introScreen.classList.add("hidden");
}

if(startButton) startButton.addEventListener("click",startGame);

function updateWorld(){
  if(gameStarted){
    move();
    progress();
    collectScrap();

    const targetX=player.x-W*.35;
    const targetY=player.y-H*.55;
    camX+=(targetX-camX)*.09;
    camY+=(targetY-camY)*.07;

    if(tunnelMode){
      camX=Math.max(-100,Math.min(8500,camX));
      camY=Math.max(-300,Math.min(250,camY));
    }else{
      camX=Math.max(-100,Math.min(12100,camX));
      camY=Math.max(-250,Math.min(180,camY));
    }
  }

  worldTime+=1;

  for(const r of rain){
    r.x+=r.drift;
    r.y+=r.speed;
    if(r.y>H+30){r.y=-30;r.x=Math.random()*W;}
    if(r.x<-30)r.x=W+30;
    if(r.x>W+30)r.x=-30;
  }

  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;
    p.y+=p.vy;
    p.vy+=.08;
    p.life--;
    if(p.life<=0)particles.splice(i,1);
  }

  staminaEl.style.width=player.stamina+"%";
  scrapEl.textContent=scrap;
  componentsEl.textContent=components+"/3";

  const c=nearestComponent();
  const o=nearestObject();
  if(gameStarted && (c||o)) prompt.classList.add("show");
  else prompt.classList.remove("show");
}

function drawBackground(){
  if(tunnelMode){
    const g=ctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,"#020609");
    g.addColorStop(.45,"#0b171a");
    g.addColorStop(1,"#03080a");
    ctx.fillStyle=g;
    ctx.fillRect(0,0,W,H);

    ctx.save();
    const offset=camX*.25;
    for(let i=-2;i<30;i++){
      const x=i*420-offset;
      ctx.fillStyle="rgba(25,43,46,.4)";
      ctx.fillRect(x,80,340,360);
      ctx.strokeStyle="rgba(90,125,120,.12)";
      ctx.lineWidth=5;
      ctx.strokeRect(x,80,340,360);
      ctx.fillStyle="rgba(170,225,200,.08)";
      ctx.fillRect(x+40,150,160,4);
      ctx.fillRect(x+40,170,100,4);
    }
    ctx.restore();
    ctx.fillStyle="rgba(0,0,0,.55)";
    ctx.fillRect(0,0,W,90);
    return;
  }

  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,"#07111e");
  g.addColorStop(.45,"#21464d");
  g.addColorStop(1,"#08131a");
  ctx.fillStyle=g;
  ctx.fillRect(0,0,W,H);

  ctx.save();
  const far=camX*.12;
  for(let i=-10;i<50;i++){
    const x=i*230-far;
    const h=180+(Math.abs(i)%7)*42;
    ctx.fillStyle=i%2?"rgba(20,42,48,.55)":"rgba(25,51,56,.7)";
    ctx.fillRect(x,H-h,180,h);
    for(let y=H-h+30;y<H-20;y+=42){
      ctx.fillStyle="rgba(180,230,210,.08)";
      ctx.fillRect(x+18,y,30,5);
      ctx.fillRect(x+65,y,30,5);
      ctx.fillRect(x+112,y,30,5);
    }
  }
  for(let i=-8;i<40;i++){
    const x=i*420-camX*.22;
    const y=120+(Math.abs(i)%4)*70;
    ctx.fillStyle="rgba(130,175,175,.09)";
    ctx.fillRect(x,y,260,12);
    ctx.fillRect(x+40,y+12,170,40);
  }
  ctx.restore();
}

function drawSurfaceWorld(){
  for(let i=-5;i<50;i++){
    ctx.fillStyle="rgba(180,220,210,.025)";
    ctx.fillRect(i*350,-300,230,1100);
  }

  platforms.forEach((p,i)=>{
    ctx.fillStyle=i>=10?"#263b40":"#293d42";
    ctx.fillRect(p.x,p.y,p.w,p.h);
    ctx.fillStyle="#60736d";
    ctx.fillRect(p.x,p.y,p.w,5);
    for(let x=p.x+35;x<p.x+p.w-20;x+=95){
      ctx.fillStyle="rgba(8,18,22,.55)";
      ctx.fillRect(x,p.y+18,45,5);
      ctx.fillStyle="rgba(160,205,190,.08)";
      ctx.fillRect(x+5,p.y+30,8,18);
      ctx.fillRect(x+20,p.y+30,8,18);
    }
  });

  if(stage>=6){
    for(let x=4000;x<6000;x+=180){
      const h=110+(Math.floor(x/180)%4)*35;
      ctx.fillStyle="#15272c";
      ctx.fillRect(x,500-h,145,h);
      for(let y=530-h;y<470;y+=32){
        ctx.fillStyle="rgba(185,239,200,.12)";
        ctx.fillRect(x+18,y,25,7);
        ctx.fillRect(x+65,y,25,7);
      }
    }
  }

  anchors.forEach(a=>drawAnchor(a));

  scraps.forEach(s=>{
    if(s.collected)return;
    ctx.save();
    ctx.translate(s.x,s.y);
    ctx.rotate(Math.sin(worldTime/300+s.x)*.2);
    ctx.fillStyle="#e5c76f";
    ctx.shadowBlur=12;
    ctx.shadowColor="#e5c76f";
    ctx.fillRect(-6,-5,12,10);
    ctx.fillStyle="#fff1a8";
    ctx.fillRect(-3,-5,3,10);
    ctx.restore();
  });

  items.forEach(it=>{
    if(it.collected)return;
    ctx.fillStyle="#d9f8df";
    ctx.shadowBlur=20;
    ctx.shadowColor="#b9efc8";
    ctx.beginPath();
    ctx.arc(it.x,it.y,9+Math.sin(Date.now()/150)*2,0,Math.PI*2);
    ctx.fill();
    ctx.shadowBlur=0;
  });

  /* major world landmarks */
  ctx.fillStyle="#51686a";
  ctx.fillRect(3510,150,16,350);
  ctx.fillRect(3590,150,16,350);
  ctx.fillStyle=components>=3?"#d9f8df":"#657879";
  ctx.shadowBlur=components>=3?30:5;
  ctx.shadowColor="#b9efc8";
  ctx.beginPath();ctx.arc(3558,125,23,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;

  if(stage>=6){
    for(let i=0;i<55;i++){
      const x=4000+i*70,y=445-(i%4)*28;
      ctx.fillStyle="rgba(185,239,200,.7)";
      ctx.shadowBlur=10;ctx.shadowColor="#b9efc8";
      ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();
    }
    ctx.shadowBlur=0;
  }

  if(stage>=7) drawPerson(4550,405);

  if(stage>=8){
    ctx.fillStyle="#0b1417";ctx.fillRect(6030,270,340,250);
    ctx.strokeStyle="#6d8580";ctx.lineWidth=7;ctx.strokeRect(6030,270,340,250);
    ctx.fillStyle="#020708";ctx.fillRect(6100,350,200,170);
    ctx.strokeStyle="rgba(185,239,200,.55)";ctx.lineWidth=4;ctx.strokeRect(6100,350,200,170);
    ctx.fillStyle="rgba(185,239,200,.8)";ctx.fillRect(6080,315,240,7);
  }

  if(stage>=11&&!tunnelMode){
    for(let i=0;i<6;i++)drawPerson(9361+i*34,454-(i%2)*5);
  }

  if(stage>=14){
    ctx.fillStyle="#17282d";ctx.fillRect(11680,320,330,180);
    ctx.strokeStyle="#78918a";ctx.lineWidth=4;ctx.strokeRect(11680,320,330,180);
    ctx.fillStyle="rgba(185,239,200,.18)";ctx.fillRect(11730,370,230,8);ctx.fillRect(11730,400,160,6);
  }

  if(player.grapple) drawCable();
  drawPlayer();
  drawParticles();
}

function drawTunnelWorld(){
  ctx.fillStyle="#050a0c";ctx.fillRect(-500,0,9500,100);

  for(let x=-300;x<9000;x+=280){
    const wobble=Math.sin(x*.03)*20;
    ctx.fillStyle="#111e21";
    ctx.beginPath();
    ctx.moveTo(x,100+wobble);ctx.lineTo(x+240,100+wobble);ctx.lineTo(x+270,620);ctx.lineTo(x,620);ctx.closePath();ctx.fill();
    ctx.strokeStyle="rgba(80,115,110,.2)";ctx.lineWidth=3;ctx.stroke();
    ctx.strokeStyle="rgba(105,145,135,.18)";ctx.lineWidth=10;
    ctx.beginPath();ctx.moveTo(x+60,120);ctx.lineTo(x+60,500);ctx.stroke();
  }

  tunnelPlatforms.forEach((p,i)=>{
    ctx.fillStyle=i%2?"#25373a":"#1d3034";ctx.fillRect(p.x,p.y,p.w,p.h);
    ctx.fillStyle="#566d68";ctx.fillRect(p.x,p.y,p.w,5);
    for(let x=p.x+40;x<p.x+p.w-20;x+=100){
      ctx.strokeStyle="rgba(0,0,0,.4)";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,p.y+12);ctx.lineTo(x+15,p.y+30);ctx.lineTo(x-5,p.y+50);ctx.stroke();
    }
  });

  for(let x=100;x<8500;x+=210){
    const active=Math.sin(x*.17+worldTime*.004)>.15;
    ctx.fillStyle=active?"rgba(185,239,200,.6)":"rgba(100,130,125,.15)";
    ctx.shadowBlur=active?18:0;ctx.shadowColor="#b9efc8";ctx.fillRect(x,185,34,6);ctx.shadowBlur=0;
  }

  if(stage>=11){
    ctx.fillStyle="rgba(120,170,150,.08)";ctx.fillRect(4850,360,900,210);
    for(let i=0;i<6;i++){
      const x=5000+i*110;
      ctx.fillStyle="#263b3c";ctx.beginPath();ctx.moveTo(x,500);ctx.lineTo(x+50,410);ctx.lineTo(x+100,500);ctx.closePath();ctx.fill();
    }
    ctx.fillStyle="#d9f8df";ctx.shadowBlur=30;ctx.shadowColor="#b9efc8";ctx.beginPath();ctx.arc(5350,470,14+Math.sin(worldTime*.02)*4,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  }

  if(stage>=12){
    ctx.fillStyle="#071012";ctx.fillRect(7850,180,260,250);
    ctx.strokeStyle="#829890";ctx.lineWidth=5;ctx.strokeRect(7850,180,260,250);
    for(let y=230;y<420;y+=35){ctx.fillStyle="#435a57";ctx.fillRect(7900,y,160,7);}
    ctx.fillStyle="#b9efc8";ctx.shadowBlur=25;ctx.shadowColor="#b9efc8";ctx.fillRect(7900,200,160,6);ctx.shadowBlur=0;
  }

  if(stage>=13){
    ctx.fillStyle="#b9efc8";ctx.shadowBlur=50;ctx.shadowColor="#b9efc8";ctx.fillRect(8300,350,450,12);ctx.shadowBlur=0;
    ctx.fillStyle="rgba(185,239,200,.12)";ctx.fillRect(8300,360,450,310);
  }

  tunnelAnchors.forEach(a=>drawAnchor(a));
  if(player.grapple)drawCable();
  drawPlayer();
  drawParticles();
}

function drawAnchor(a){
  const pulse=9+Math.sin(Date.now()/180)*2;
  ctx.strokeStyle=player.grapple===a?"rgba(220,255,240,.9)":"rgba(150,240,220,.35)";
  ctx.lineWidth=player.grapple===a?3:1;
  ctx.beginPath();ctx.arc(a.x,a.y,pulse,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle="#b9efc8";ctx.beginPath();ctx.arc(a.x,a.y,4,0,Math.PI*2);ctx.fill();
}

function drawCable(){
  ctx.strokeStyle="#d6eee6";ctx.lineWidth=2;ctx.beginPath();
  ctx.moveTo(player.x+14,player.y+20);ctx.lineTo(player.grapple.x,player.grapple.y);ctx.stroke();
}

function drawPerson(x,y){
  ctx.fillStyle="#111b1d";ctx.fillRect(x-15,y+13,30,58);
  ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#b9efc8";ctx.fillRect(x+8,y-3,7,3);
}

function drawPlayerShadow(){
  const cx=player.x+player.w/2;
  let groundY=700;
  const list=tunnelMode?tunnelPlatforms:platforms;
  for(const p of list){
    if(cx>=p.x&&cx<=p.x+p.w&&p.y>=player.y+player.h-2&&p.y<groundY)groundY=p.y;
  }
  const height=Math.max(0,groundY-(player.y+player.h));
  const scale=Math.max(.18,1-height/330);
  ctx.save();ctx.globalAlpha=.25*scale;ctx.fillStyle="#000";
  ctx.beginPath();ctx.ellipse(cx,groundY+3,22*scale,5*scale,0,0,Math.PI*2);ctx.fill();ctx.restore();
}

function drawPlayer(){
  drawPlayerShadow();
  ctx.save();
  const tilt=Math.max(-.08,Math.min(.08,player.vx*.012));
  ctx.translate(player.x+14,player.y+24);ctx.rotate(tilt);
  ctx.fillStyle="#d8e8e0";ctx.fillRect(-9,-8,18,24);
  ctx.fillStyle="#17292e";ctx.beginPath();ctx.arc(0,-16,11,0,Math.PI*2);ctx.fill();
  ctx.fillStyle="#b9efc8";ctx.fillRect(player.facing>0?3:-10,-18,7,3);
  ctx.fillStyle="#31464a";ctx.fillRect(-14,-6,5,17);
  ctx.restore();
}

function drawParticles(){
  particles.forEach(q=>{
    ctx.globalAlpha=Math.max(0,q.life/40);
    ctx.fillStyle=q.type==="energy"?"#b9efc8":"#ccd8d3";
    ctx.fillRect(q.x,q.y,4,4);
  });
  ctx.globalAlpha=1;
}

function drawRain(){
  if(tunnelMode)return;
  ctx.save();ctx.strokeStyle="rgba(190,225,220,.17)";ctx.lineWidth=1;
  for(const r of rain){
    ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x+r.drift,r.y+r.length);ctx.stroke();
  }
  ctx.restore();
}

function drawWorld(){
  ctx.clearRect(0,0,W,H);
  drawBackground();
  ctx.save();ctx.translate(-camX,-camY);
  if(tunnelMode)drawTunnelWorld();else drawSurfaceWorld();
  ctx.restore();
  const v=ctx.createRadialGradient(W/2,H/2,100,W/2,H/2,Math.max(W,H)*.7);
  v.addColorStop(0,"transparent");v.addColorStop(1,"rgba(0,0,0,.45)");
  ctx.fillStyle=v;ctx.fillRect(0,0,W,H);
  drawRain();
}

function gameLoop(){
  updateWorld();
  drawWorld();
  requestAnimationFrame(gameLoop);
}

objective();
gameLoop();
