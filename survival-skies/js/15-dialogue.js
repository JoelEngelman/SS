/* ============================================================
   DIALOGUE
   ============================================================ */

function say(s,t,d=3200){

  speaker.textContent=s;
  dialogueText.textContent=t;

  dialogue.classList.add("show");

  clearTimeout(say.timer);

  say.timer=setTimeout(()=>{

    dialogue.classList.remove("show");

  },d);

}
