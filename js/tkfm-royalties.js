window.TKFM_ROYALTIES = (function() {

  async function recordRevenue(email, trackName, revenue) {
    const res = await fetch('/.netlify/functions/track-royalty', {
      method: 'POST',
      body: JSON.stringify({ email, trackName, revenue }),
    });
    return res.json();
  }

  async function getStatements(email) {
    const res = await fetch(`/.netlify/functions/get-royalties?email=${encodeURIComponent(email)}`);
    return res.json();
  }

  async function renderStatements(email, containerId) {
    const data = await getStatements(email);
    const div = document.getElementById(containerId);
    div.innerHTML = "<h3>Royalty Statements</h3>";
    if (!data.earnings.length) {
      div.innerHTML += "<p>No earnings yet.</p>";
      return;
    }
    data.earnings.forEach(e => {
      div.innerHTML += `<div>
        <strong>${e.trackName}</strong> — Total: $${e.revenue} | Artist: $${e.splits.artist} | Label: $${e.splits.label} | Date: ${new Date(e.date).toLocaleDateString()}
      </div>`;
    });
  }

  return { recordRevenue, getStatements, renderStatements };
})();
