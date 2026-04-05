/*
 TKFM Records V3 — Radio Spin Royalty Accrual
*/

(function(){
  const RATE_PER_SPIN = 0.02; // label-controlled

  const spins = JSON.parse(localStorage.getItem("tkfm_radio_rotation") || "[]");

  spins.forEach(t => {
    if (!t.active) return;

    TKFM_ROYALTIES.add({
      artistEmail: t.artistEmail,
      track: t.title,
      source: "radio",
      gross: RATE_PER_SPIN,
      artistSplit: 0.7,
      labelSplit: 0.3
    });
  });
})();
