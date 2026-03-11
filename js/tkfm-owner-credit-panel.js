window.TKFM_OWNER_CREDIT_PANEL = (function() {

  async function render(email) {
    const res = await fetch('/.netlify/functions/get-credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    const el = document.getElementById('ownerCreditPanel');
    if (el) {
      el.innerHTML = `<pre style="color:#facc15;">${JSON.stringify(data, null, 2)}</pre>`;
    }
  }

  return { render };

})();
