/*
TKFM Universal Checkout (V3)
lookup_key based Stripe Checkout
*/

(function(){
  async function startCheckout(lookupKey){
    try{
      const res = await fetch('/.netlify/functions/api/create-checkout-session',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          lookup_key: lookupKey,
          success_url: window.location.origin + '/sponsor-success.html',
          cancel_url: window.location.origin + '/owner-pages/sponsor-read-canceled.html'
        })
      });

      const data = await res.json();
      if(!data.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;

    }catch(err){
      console.error('Checkout error:', err);
      alert('Checkout failed. Please try again.');
    }
  }

  document.addEventListener('click', e=>{
    const btn = e.target.closest('[data-buy]');
    if(!btn) return;
    e.preventDefault();
    startCheckout(btn.dataset.buy);
  });
})();
