(function(){

  const style = document.createElement("style");

  style.innerHTML = `

  /* BACKGROUND */
  body{
    background: radial-gradient(circle at center, #020617 0%, #000000 100%);
    color:#facc15;
    font-family:Arial;
    animation: bgPulse 8s infinite alternate;
  }

  @keyframes bgPulse{
    0% { background: radial-gradient(circle at center, #020617 0%, #000000 100%); }
    100% { background: radial-gradient(circle at center, #020617 0%, #050505 100%); }
  }

  /* HEADINGS GLOW */
  h1,h2,h3{
    color:#facc15;
    text-shadow: 0 0 10px rgba(250,204,21,0.6);
    animation: glowPulse 2s infinite alternate;
  }

  @keyframes glowPulse{
    0% { text-shadow: 0 0 5px rgba(250,204,21,0.4); }
    100% { text-shadow: 0 0 20px rgba(250,204,21,0.9); }
  }

  /* INPUTS */
  input{
    background:#020617;
    border:1px solid #facc15;
    color:#facc15;
    padding:10px;
    border-radius:8px;
    transition:0.3s;
  }

  input:focus{
    outline:none;
    box-shadow: 0 0 10px rgba(250,204,21,0.8);
  }

  /* BUTTONS */
  button{
    background:#020617;
    border:1px solid #facc15;
    color:#facc15;
    padding:10px 15px;
    border-radius:8px;
    transition:0.3s;
  }

  button:hover{
    background:#facc15;
    color:#000;
    transform:scale(1.05);
    box-shadow: 0 0 15px rgba(250,204,21,0.9);
  }

  /* CARDS */
  .card{
    background: rgba(0,0,0,0.6);
    border:1px solid rgba(250,204,21,0.4);
    border-radius:12px;
    padding:20px;
    box-shadow: 0 0 20px rgba(250,204,21,0.2);
    animation: cardFloat 4s ease-in-out infinite;
  }

  @keyframes cardFloat{
    0% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0px); }
  }

  /* LIVE MARKET TEXT FLASH (GREEN/RED) */
  .price-up{
    color:#22c55e;
    animation: flashUp 1s ease;
  }

  .price-down{
    color:#ef4444;
    animation: flashDown 1s ease;
  }

  @keyframes flashUp{
    0% { background: rgba(34,197,94,0.3); }
    100% { background: transparent; }
  }

  @keyframes flashDown{
    0% { background: rgba(239,68,68,0.3); }
    100% { background: transparent; }
  }

  /* LOADING PULSE */
  .loading{
    animation: loadingPulse 1.5s infinite;
  }

  @keyframes loadingPulse{
    0% { opacity:0.4; }
    50% { opacity:1; }
    100% { opacity:0.4; }
  }

  /* SCROLLBAR GOLD */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: #facc15;
    border-radius: 10px;
  }

  `;

  document.head.appendChild(style);

})();
