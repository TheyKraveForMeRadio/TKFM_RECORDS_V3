document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#artistForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const artistName = document.querySelector('#artistName').value;
    const email = document.querySelector('#email').value;
    const trackTitle = document.querySelector('#trackTitle').value;

    try {
      // 🔥 CREATE STRIPE SESSION
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistName, email, trackTitle })
      });

      const data = await res.json();

      // 🔥 REDIRECT TO STRIPE
      window.location.href = data.url;

    } catch (err) {
      console.error(err);
      alert('Payment failed ❌');
    }

  });

});
