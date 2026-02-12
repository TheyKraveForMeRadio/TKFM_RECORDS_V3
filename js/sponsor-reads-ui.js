// TKFM Records — Sponsor Reads UI
(function(){
  if (!window.TKFM_LABEL_GATE || !window.TKFM_LABEL_GATE.requireSubscription()) return;

  const container = document.createElement("div");
  container.id = "tkfm-sponsor-reads";
  container.style.cssText = "padding:1rem;background:#f97316;color:#020617;border-radius:8px;margin:1rem 0;";
  container.innerHTML = `
    <h3>AI Sponsor Reads</h3>
    <label>Email: <input type="email" id="sponsorEmail" placeholder="artist@example.com"></label>
    <select id="sponsorPack">
      <option value="sponsor_read_5pack">5 Pack</option>
      <option value="sponsor_read_20pack">20 Pack</option>
      <option value="sponsor_read_monthly">Monthly</option>
    </select>
    <button id="sponsorBtn">Generate Sponsor Read</button>
    <div id="sponsorResult" style="margin-top:0.5rem;"></div>
  `;
  document.body.prepend(container);

  document.getElementById("sponsorBtn").addEventListener("click", async () => {
    const email = document.getElementById("sponsorEmail").value;
    const packType = document.getElementById("sponsorPack").value;
    if (!email) return alert("Enter email");

    const res = await fetch("/.netlify/functions/sponsor-reads", {
      method: "POST",
      body: JSON.stringify({ artistEmail: email, packType })
    });
    const data = await res.json();
    const resultDiv = document.getElementById("sponsorResult");
    if (data.success) {
      resultDiv.innerHTML = `<a href="${data.url}" target="_blank">Download Sponsor Read</a>`;
    } else {
      resultDiv.textContent = "Error generating sponsor read";
    }
  });
})();
