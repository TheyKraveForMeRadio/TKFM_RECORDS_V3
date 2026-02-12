// TKFM V3 — Master Autoload: Lane Lock + Background + FX
(function(){
  const html = document.documentElement;

  // --- LANE LOCK ---
  const metaLane = document.querySelector('meta[name="tkfm-lane"]');
  const lane = metaLane ? metaLane.content.toLowerCase() : null;
  if(lane) html.setAttribute("data-tkfm-lane", lane);

  // --- BACKGROUND DIVS ---
  if(!document.querySelector('.tkfm-bg-main')){
    const bgMain = document.createElement('div');
    bgMain.className = 'tkfm-bg-main';
    document.body.prepend(bgMain);

    const bgOrbit = document.createElement('div');
    bgOrbit.className = 'tkfm-bg-orbit';
    document.body.prepend(bgOrbit);
  }

  // --- THEME & FX LOADERS ---
  if(lane === "records-only"){
    // Remove Radio scripts if present
    document.querySelectorAll('script[src*="tkfm-radio"]').forEach(s=>s.remove());

    // Inject Records CSS if missing
    if(!document.querySelector('link[href="/css/tkfm-records.css"]')){
      const l = document.createElement('link');
      l.rel = "stylesheet";
      l.href = "/css/tkfm-records.css";
      document.head.appendChild(l);
    }

    // Inject Records Autoload FX if missing
    if(!document.querySelector('script[src="/js/tkfm-records-autoload.js"]')){
      const s = document.createElement('script');
      s.src = "/js/tkfm-records-autoload.js";
      document.head.appendChild(s);
    }
  }

  // Force Records theme globally
  html.setAttribute("data-tkfm-theme","records");

  // Ensure TKFM Shell FX is loaded
  if(!document.querySelector('script[src="/js/tkfm-shell.js"]')){
    const s = document.createElement("script");
    s.src = "/js/tkfm-shell.js";
    s.defer = true;
    document.head.appendChild(s);
  }
})();
