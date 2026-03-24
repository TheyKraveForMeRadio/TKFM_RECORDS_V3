// 🌌 GOD MODE VISUAL ENGINE

// 🔊 SOUND ENGINE
export function playSound(type="click"){
  const sounds = {
    click:"/assets/click.mp3",
    success:"/assets/success.mp3",
    error:"/assets/error.mp3"
  };
  const audio = new Audio(sounds[type] || sounds.click);
  audio.volume = 0.4;
  audio.play();
}

// 🎯 HOLOGRAPHIC CURSOR
export function initCursor(){
  const cursor = document.createElement("div");
  cursor.style.position = "fixed";
  cursor.style.width = "20px";
  cursor.style.height = "20px";
  cursor.style.border = "2px solid #facc15";
  cursor.style.borderRadius = "50%";
  cursor.style.pointerEvents = "none";
  cursor.style.zIndex = "9999";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e=>{
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

// 🌐 3D BACKGROUND GRID
export function initGrid(){
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "rgba(250,204,21,0.1)";

    for(let i=0;i<canvas.width;i+=50){
      ctx.beginPath();
      ctx.moveTo(i,0);
      ctx.lineTo(i,canvas.height);
      ctx.stroke();
    }

    for(let i=0;i<canvas.height;i+=50){
      ctx.beginPath();
      ctx.moveTo(0,i);
      ctx.lineTo(canvas.width,i);
      ctx.stroke();
    }

    requestAnimationFrame(draw);
  }

  draw();
}

// 📊 LIVE NUMBER COUNTER
export function liveCounter(id, start=0){
  let value = start;
  setInterval(()=>{
    value += Math.random()*10;
    document.getElementById(id).innerText = "$" + value.toFixed(2);
  },2000);
}

// 🔥 HEATMAP (TOP MOVERS)
export async function loadHeatmap(){
  const res = await fetch("/.netlify/functions/engine/get-trades?catalog_id=demo");
  const data = await res.json();

  const heat = document.getElementById("heatmap");

  heat.innerHTML = "";

  data.trades.slice(0,10).forEach(t=>{
    const el = document.createElement("div");
    el.style.padding = "5px";
    el.style.margin = "3px";
    el.style.background = "rgba(250,204,21," + Math.random() + ")";
    el.innerText = "$" + t.price;
    heat.appendChild(el);
  });
}

// 🎤 AI VOICE (simple TTS)
export function speak(text){
  const msg = new SpeechSynthesisUtterance(text);
  msg.rate = 1;
  msg.pitch = 1;
  speechSynthesis.speak(msg);
}
