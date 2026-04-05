document.addEventListener('mousemove',e=>{
  document.documentElement.style.setProperty('--fx-x',e.clientX+'px');
  document.documentElement.style.setProperty('--fx-y',e.clientY+'px');
});
