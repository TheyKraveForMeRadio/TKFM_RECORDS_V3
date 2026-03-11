// ==============================
// TKFM OWNER CREDIT PANEL
// READ-ONLY CREDIT VIEW
// ==============================

// Auto-Boost & KPI Engine (placeholder-safe)
async function runAutoBoost() {
  try {
    await fetch('/.netlify/functions/auto-boost');
  } catch (e) {
    console.warn("auto-boost not active");
  }

  try {
    await fetch('/.netlify/functions/auto-radio');
  } catch (e) {
    console.warn("auto-radio not active");
  }

  await renderCreditPanel();
}

// Owner Credit Panel Render (READ ONLY)
async function renderCreditPanel() {
  try {
    const res = await fetch('/.netlify/functions/get-credits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: window.TKFM_EMAIL
      })
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(errText);
    }

    const data = await res.json();

    const panel = document.getElementById('ownerCreditPanel');
    if (!panel) return;

    panel.innerHTML =
      `<pre style="color:#facc15;">${JSON.stringify(data, null, 2)}</pre>`;

  } catch (err) {
    console.error("Credit panel error:", err);
  }
}

// Run every 10 min
setInterval(runAutoBoost, 600000);

// Initial load
runAutoBoost();
