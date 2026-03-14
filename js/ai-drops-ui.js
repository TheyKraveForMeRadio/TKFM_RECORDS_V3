// TKFM Records — AI Drops UI
(function(){
  if (!window.TKFM_LABEL_GATE || !window.TKFM_LABEL_GATE.requireSubscription()) return;

  const container = document.createElement("div");
  container.id = "tkfm-ai-drops";
  container.style.cssText = "padding:1rem;background:#facc15;color:#020617;border-radius:8px;margin:1rem 0;";
  container.innerHTML = `
    <h3>AI Drops Generator</h3>
    <label>Email: <input type="email" id="aiDropEmail" placeholder="artist@example.com"></label>
    <select id="aiDropPack">
      <option value="drop_pack_10">Drop Pack 10</option>
      <option value="drop_pack_25">Drop Pack 25</option>
      <option value="drop_pack_100">Drop Pack 100</option>
    </select>
    <button id="aiDropBtn">Generate Drop</button>
    <div id="aiDropResult" style="margin-top:0.5rem;"></div>
  `;
  document.body.prepend(container);

  document.getElementById("aiDropBtn").addEventListener("click", async () => {
    const email = document.getElementById("aiDropEmail").value;
    const packKey = document.getElementById("aiDropPack").value;
    if (!email) return alert("Enter email");

    const res = await fetch("/.netlify/functions/api/ai-drops-engine", {
      method: "POST",
      body: JSON.stringify({ artistEmail: email, dropPackKey: packKey })
    });
    const data = await res.json();
    const resultDiv = document.getElementById("aiDropResult");
    if (data.success) {
      resultDiv.innerHTML = `<a href="${data.url}" target="_blank">Download AI Drop</a>`;
    } else {
      resultDiv.textContent = "Error generating drop";
    }
  });
})();
