// TKFM Records — Label Studio UI
(function(){
  if (!window.TKFM_LABEL_GATE || !window.TKFM_LABEL_GATE.requireSubscription()) return;

  const container = document.createElement("div");
  container.id = "tkfm-label-studio";
  container.style.cssText = "padding:1rem;background:#eab308;color:#020617;border-radius:8px;margin:1rem 0;";
  container.innerHTML = `
    <h3>Label Studio AI Feedback</h3>
    <label>Track ID: <input type="text" id="studioTrackId" placeholder="track123"></label>
    <label>Email: <input type="email" id="studioEmail" placeholder="artist@example.com"></label>
    <button id="studioBtn">Get AI Suggestions</button>
    <div id="studioResult" style="margin-top:0.5rem;"></div>
  `;
  document.body.prepend(container);

  document.getElementById("studioBtn").addEventListener("click", async () => {
    const trackId = document.getElementById("studioTrackId").value;
    const email = document.getElementById("studioEmail").value;
    if (!trackId || !email) return alert("Enter track ID and email");

    const res = await fetch("/.netlify/functions/api/label-studio-ai", {
      method: "POST",
      body: JSON.stringify({ trackId, artistEmail: email })
    });
    const data = await res.json();
    const resultDiv = document.getElementById("studioResult");
    if (data.success) {
      resultDiv.innerHTML = `
        <strong>AI Suggestions:</strong>
        <ul>
          <li>EQ: ${data.suggestions.eq}</li>
          <li>Compression: ${data.suggestions.compression}</li>
          <li>FX: ${data.suggestions.fx.join(", ")}</li>
        </ul>
      `;
    } else {
      resultDiv.textContent = "Error getting AI suggestions";
    }
  });
})();
