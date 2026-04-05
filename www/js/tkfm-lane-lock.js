// TKFM V3 — Lane Hard Lock (Radio vs Records)
(function(){
  const meta = document.querySelector('meta[name="tkfm-lane"]');
  if(!meta) return console.warn("No TKFM lane meta set. Aborting lane lock.");

  const lane = meta.content.toLowerCase();
  const html = document.documentElement;

  // Apply HTML attribute for theme enforcement
  html.setAttribute("data-tkfm-lane", lane);

  // Records lane
  if(lane === "records-only") {
    // Remove Radio-only scripts
    document.querySelectorAll('script[src*="tkfm-radio"]').forEach(s=>s.remove());
    // Inject Records Autoload
    if(!document.querySelector('script[src="/js/tkfm-records-autoload.js"]')){
      const s = document.createElement("script");
      s.src = "/js/tkfm-records-autoload.js";
      document.head.appendChild(s);
    }
    // Inject Records CSS if missing
    if(!document.querySelector('link[href="/css/tkfm-records.css"]')){
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "/css/tkfm-records.css";
      document.head.appendChild(l);
    }
  }

  // Radio lane
  if(lane === "radio-only") {
    // Remove Records-only scripts
    document.querySelectorAll('script[src*="tkfm-records"]').forEach(s=>s.remove());
    // Inject Radio Autoload
    if(!document.querySelector('script[src="/js/tkfm-radio-autoload.js"]')){
      const s = document.createElement("script");
      s.src = "/js/tkfm-radio-autoload.js";
      document.head.appendChild(s);
    }
    // Inject Radio CSS if missing
    if(!document.querySelector('link[href="/css/tkfm-radio.css"]')){
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "/css/tkfm-radio.css";
      document.head.appendChild(l);
    }
  }
})();
