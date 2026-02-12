// TKFM V3 — Auto Background + FX Loader
(function(){
  // Prevent double injection
  if(document.querySelector('.tkfm-bg-main')) return;

  // Inject main background divs
  const bgMain = document.createElement('div');
  bgMain.className = 'tkfm-bg-main';
  document.body.prepend(bgMain);

  const bgOrbit = document.createElement('div');
  bgOrbit.className = 'tkfm-bg-orbit';
  document.body.prepend(bgOrbit);

  // Auto load Records theme FX if lane is records-only
  const meta = document.querySelector('meta[name="tkfm-lane"]');
  if(meta && meta.content.toLowerCase() === 'records-only'){
    // Inject Records Autoload if not already present
    if(!document.querySelector('script[src="/js/tkfm-records-autoload.js"]')){
      const s = document.createElement('script');
      s.src = '/js/tkfm-records-autoload.js';
      document.head.appendChild(s);
    }
  }
})();
