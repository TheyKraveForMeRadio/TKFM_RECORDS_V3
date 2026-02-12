/*
TKFM Sponsor Read Engine — Checkout & Live Credits
*/
document.addEventListener('DOMContentLoaded', () => {
  const checkoutButtons = document.querySelectorAll('.sponsor-checkout-btn');
  const creditsDisplay = document.getElementById('credits');

  // Fetch and update credits
  async function updateCredits() {
    try {
      const res = await fetch('/.netlify/functions/sponsor-credits-get');
      const data = await res.json();
      if(creditsDisplay) creditsDisplay.textContent = data.credits || 0;
    } catch(err) {
      console.error('Error fetching credits:', err);
      if(creditsDisplay) creditsDisplay.textContent = '—';
    }
  }

  // Initial credits fetch
  updateCredits();

  // Refresh every 15 seconds
  setInterval(updateCredits, 15000);

  // Checkout buttons
  checkoutButtons.forEach(btn => {
    btn.addEventListener('click', async e => {
      e.preventDefault();
      const packKey = btn.dataset.pack;
      try {
        const res = await fetch(`/api/create-checkout-session?pack=${packKey}`);
        const data = await res.json();
        if(data.url){
          window.location.href = data.url;
        } else {
          alert('Checkout failed. Please try again.');
        }
      } catch(err) {
        console.error(err);
        alert('Checkout error. Check console.');
      }
    });
  });
});
