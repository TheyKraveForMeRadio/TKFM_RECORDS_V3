document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#artistForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const artistName = document.querySelector('#artistName').value;
    const email = document.querySelector('#email').value;
    const trackTitle = document.querySelector('#trackTitle').value;
    const plan = document.querySelector('#plan').value;

    const res = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ artistName, email, trackTitle, plan })
    });

    const data = await res.json();
    window.location.href = data.url;

  });

});
