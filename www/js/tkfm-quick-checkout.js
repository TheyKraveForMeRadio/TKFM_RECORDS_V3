function tkfmQuickCheckout(lookup_key){
  fetch('/.netlify/functions/api/create-checkout-session',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({lookup_key})
  })
  .then(r=>r.json())
  .then(d=>{
    if(d.url) window.location.href = d.url;
    else alert('Checkout failed');
  });
}
