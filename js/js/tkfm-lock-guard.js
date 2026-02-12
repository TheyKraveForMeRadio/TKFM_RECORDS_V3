/*
 TKFM Records V3 — Global Lock Guard
 Blocks AI, Distribution, Radio, Uploads
*/

(function(){
  const meta = document.querySelector('meta[name="artist-email"]');
  if (!meta) return;

  const artistEmail = meta.content;
  if (!window.TKFM_CONTRACT) return;

  const status = TKFM_CONTRACT.getStatus(artistEmail);

  if (status.status === "breach" || status.status === "terminated") {
    document.body.innerHTML = `
      <div style="padding:2rem;color:#facc15;background:#020617">
        <h2>Account Locked</h2>
        <p>${status.reason || "Contract enforcement in effect."}</p>
        <p>Contact TKFM Records.</p>
      </div>
    `;
    throw new Error("TKFM LOCK ACTIVE");
  }
})();
