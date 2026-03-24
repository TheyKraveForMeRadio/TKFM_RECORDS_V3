// 🔊 SOUND EFFECTS
export function playClick(){
  const audio = new Audio("/assets/click.mp3");
  audio.play();
}

// 📊 ANIMATED COUNTER
export function animateValue(id, start, end, duration){
  let range = end - start;
  let current = start;
  let increment = range / (duration / 16);
  const el = document.getElementById(id);

  const timer = setInterval(()=>{
    current += increment;
    if((increment > 0 && current >= end) || (increment < 0 && current <= end)){
      current = end;
      clearInterval(timer);
    }
    el.innerText = "$" + current.toFixed(2);
  },16);
}

// 🌌 PARTICLES
export function initParticles(){
  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  for(let i=0;i<50;i++){
    particles.push({
      x:Math.random()*canvas.width,
      y:Math.random()*canvas.height,
      r:Math.random()*2,
      dx:(Math.random()-0.5),
      dy:(Math.random()-0.5)
    });
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="#facc15";

    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();

      p.x+=p.dx;
      p.y+=p.dy;
    });

    requestAnimationFrame(draw);
  }

  draw();
}
