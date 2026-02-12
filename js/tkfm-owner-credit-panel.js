// Auto-Boost & KPI Engine
async function runAutoBoost() {
  await fetch('/.netlify/functions/auto-boost');
  await fetch('/.netlify/functions/auto-radio');
  renderCreditPanel();
}

// Owner Credit Panel Render
async function renderCreditPanel() {
  const res = await fetch('/.netlify/functions/use-credit', {
    method: 'POST',
    body: JSON.stringify({ email: window.TKFM_EMAIL })
  });
  const data = await res.json();
  document.getElementById('ownerCreditPanel').innerHTML =
    `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

// Run every 10 min
setInterval(runAutoBoost, 600000);
runAutoBoost();
