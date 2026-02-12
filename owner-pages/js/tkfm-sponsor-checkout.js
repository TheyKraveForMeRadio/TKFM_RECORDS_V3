/*
TKFM Sponsor Checkout JS
Handles credit purchases via Stripe for Sponsor Read Engine
Requires: Stripe public key set in environment
*/
(async () => {
  const stripe = Stripe('pk_live_YOUR_PUBLIC_KEY_HERE'); // replace with live key

  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.btn[data-buy-pack]');
    if (!btn) return;

    const pack = btn.dataset.buyPack;

    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ lookup_key: pack })
      });

      const session = await res.json();
      if(session.url){
        window.location.href = session.url;
      } else {
        console.error('Stripe session creation failed', session);
        alert('Payment could not be processed. Try again.');
      }
    } catch(err){
      console.error('Stripe checkout error:', err);
      alert('Payment could not be processed. Try again.');
    }
  });
})();
