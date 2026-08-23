/* ============================================================
   GAME START / MAIN LOOP
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

if(startButton){
  startButton.addEventListener("click",startGame);
}

function updateWorld(){
  if(gameStarted){
    move();
    progress();
    collectScrap();
  }

  worldTime+=1;

  for(const r of rain){
    r.x+=r.drift;
    r.y+=r.speed;
    if(r.y>H+30){
      r.y=-30;
      r.x=Math.random()*W;
    }
    if(r.x<-30)r.x=W+30;
  }

  for(let i=particles.length-1;i>=0;i--){
    const p=particles[i];
    p.x+=p.vx;
    p.y+=p.vy;
    p.vy+=.08;
    p.life--;
    if(p.life<=0)particles.splice(i,1);
  }

  if(gameStarted){
    const targetX=player.x-W*.35;
    camX+=(targetX-camX)*.09;
    camX=Math.max(-300,camX);
    camY+=(0-camY)*.08;
  }

  staminaEl.style.width=player.stamina+"%";
  scrapEl.textContent=scrap;
  componentsEl.textContent=components+"/3";

  const c=nearestComponent();
  const o=nearestObject();
  if(gameStarted && (c||o)) prompt.classList.add("show");
  else prompt.classList.remove("show");
}

function drawWorld(){
  ctx.clearRect(0,0,W,H);

  const underground=tunnelMode;
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,underground?"#071014":"#10272d");
  sky.addColorStop(1,underground?"#020609":"#071116");
  ctx.fillStyle=sky;
  ctx.fillRect(0,0,W,H);

  ctx.save();
  ctx.translate(-camX,-camY);

  const activePlatforms=underground?tunnelPlatforms:platforms;
  for(const p of activePlatforms){
    ctx.fillStyle=underground?"#162326":"#243b3d";
    ctx.fillRect(p.x,p.y,p.w,p.h);
    ctx.fillStyle=underground?"#42605b":"#4d6963";
    ctx.fillRect(p.x,p.y,p.w,5);
  }

  const activeAnchors=underground?tunnelAnchors:anchors;
  for(const a of activeAnchors){
    ctx.beginPath();
    ctx.arc(a.x,a.y,7,0,Math.PI*2);
    ctx.fillStyle="#aee9bb";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(a.x,a.y,15,0,Math.PI*2);
    ctx.strokeStyle="rgba(174,233,187,.25)";
    ctx.stroke();
  }

  for(const s of scraps){
    if(s.collected)continue;
    ctx.fillStyle="#d2b56d";
    ctx.fillRect(s.x-5,s.y-5,10,10);
  }

  for(let i=0;i<items.length;i++){
    const it=items[i];
    if(it.collected)continue;
    const valid=(i===0&&stage===1)||(i===1&&stage===3)||(i===2&&stage===4);
    if(!valid)continue;
    ctx.fillStyle="#b9efc8";
    ctx.beginPath();
    ctx.arc(it.x,it.y,9+Math.sin(worldTime*.08)*2,0,Math.PI*2);
    ctx.fill();
  }

  for(const o of objects){
    if(!o.active)continue;
    ctx.fillStyle="#1b2b2d";
    if(o.type==="tower"){
      ctx.fillRect(o.x-18,o.y-110,36,110);
      ctx.fillStyle="#b9efc8";
      ctx.fillRect(o.x-7,o.y-125,14,18);
    }else if(o.type==="settlement"||o.type==="survivors"){
      ctx.fillRect(o.x-55,o.y-55,110,55);
      ctx.fillStyle="#b9efc8";
      ctx.fillRect(o.x-28,o.y-35,14,14);
      ctx.fillRect(o.x+14,o.y-35,14,14);
    }else if(o.type==="transit"||o.type==="cave"){
      ctx.fillStyle="#0c171a";
      ctx.beginPath();
      ctx.arc(o.x,o.y,45,Math.PI,Math.PI*2);
      ctx.fill();
    }else{
      ctx.fillRect(o.x-30,o.y-45,60,45);
    }
  }

  if(player.grapple){
    ctx.beginPath();
    ctx.moveTo(player.x+player.w/2,player.y+player.h/2);
    ctx.lineTo(player.grapple.x,player.grapple.y);
    ctx.strokeStyle="#b9efc8";
    ctx.lineWidth=2;
    ctx.stroke();
  }

  ctx.save();
  ctx.translate(player.x+player.w/2,player.y+player.h/2);
  ctx.scale(player.facing,1);
  ctx.fillStyle="#d7eee0";
  ctx.fillRect(-14,-24,28,48);
  ctx.fillStyle="#18272a";
  ctx.beginPath();
  ctx.arc(0,-31,11,0,Math.PI*2);
  ctx.fill();
  ctx.fillStyle="#aee9bb";
  ctx.fillRect(4,-33,4,3);
  ctx.restore();

  for(const p of particles){
    ctx.globalAlpha=Math.max(0,p.life/50);
    ctx.fillStyle=p.type==="energy"?"#b9efc8":"#829890";
    ctx.fillRect(p.x-2,p.y-2,4,4);
  }
  ctx.globalAlpha=1;
  ctx.restore();

  if(!underground){
    ctx.strokeStyle="rgba(180,220,210,.16)";
    for(const r of rain){
      ctx.beginPath();
      ctx.moveTo(r.x,r.y);
      ctx.lineTo(r.x+r.drift*2,r.y+r.length);
      ctx.stroke();
    }
  }
}

function gameLoop(){
  updateWorld();
  drawWorld();
  requestAnimationFrame(gameLoop);
}

objective();
gameLoop();
