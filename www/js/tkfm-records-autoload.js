// TKFM Records Autoload
(function(){
  const d = document.documentElement;
  d.setAttribute("data-tkfm-theme","records");

  if(!document.querySelector('link[href="/css/tkfm-records.css"]')){
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "/css/tkfm-records.css";
    document.head.appendChild(l);
  }
})();
