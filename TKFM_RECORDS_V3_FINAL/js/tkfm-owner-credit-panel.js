window.TKFM_OWNER_CREDIT_PANEL = {
  async render(email) {
    const res = await fetch('/.netlify/functions/api/use-credit', {
      method: 'POST', body: JSON.stringify({ email })
    });
    const data = await res.json();
    const div = document.getElementById('ownerCreditPanel');
    div.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  }
};
