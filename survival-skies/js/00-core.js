/* ============================================================
   CORE / CANVAS
   ============================================================ */

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

let W=innerWidth;
let H=innerHeight;
let DPR=Math.min(devicePixelRatio||1,2);

function resize(){
  W=innerWidth;
  H=innerHeight;
  DPR=Math.min(devicePixelRatio||1,2);

  canvas.width=W*DPR;
  canvas.height=H*DPR;
  canvas.style.width=W+"px";
  canvas.style.height=H+"px";

  ctx.setTransform(DPR,0,0,DPR,0,0);
}

addEventListener("resize",resize);
resize();
