/*
 TKFM Records V3 — Distribution Guard
 Blocks distribution if mix not approved
*/

(function(){
  const email = document.querySelector('meta[name="artist-email"]')?.content;
  if (!email) return;

  const mixes = JSON.parse(localStorage.getItem("tkfm_mix_submissions") || "[]");
  const approved = mixes.some(m => m.artistEmail === email && m.status === "approved");

  if (!approved) {
    alert("No approved mix on file. Distribution locked.");
    document.body.innerHTML = "<h2>Distribution Locked — Mix Approval Required</h2>";
  }
})();
