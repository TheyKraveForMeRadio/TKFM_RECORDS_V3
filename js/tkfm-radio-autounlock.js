/*
 TKFM Records V3 — Auto Radio Unlock
 Requires:
 - Active label subscription
 - Approved mix
*/

(function(){
  const email = document.querySelector('meta[name="artist-email"]')?.content;
  const tier = document.querySelector('meta[name="label-tier"]')?.content || "basic";

  if (!email) return;

  const sub = JSON.parse(localStorage.getItem("tkfm_label_subscription") || "{}");
  if (!sub.active) return;

  const mixes = JSON.parse(localStorage.getItem("tkfm_mix_submissions") || "[]");
  const approved = mixes.find(m => m.artistEmail === email && m.status === "approved");

  if (!approved) return;

  const existing = (JSON.parse(localStorage.getItem("tkfm_radio_rotation") || "[]"))
    .some(t => t.artistEmail === email && t.title === approved.title);

  if (existing) return;

  TKFM_RADIO.add({
    artistEmail: email,
    title: approved.title,
    tier
  });
})();
