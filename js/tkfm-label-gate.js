// tkfm-label-gate.js — enforce monthly label subscription
window.TKFM_LABEL_GATE = (function() {

  async function checkSubscription(email) {
    try {
      const res = await fetch('/.netlify/functions/check-subscription?email=' + encodeURIComponent(email));
      const data = await res.json();
      return data.active;
    } catch (e) {
      console.error("Subscription check failed:", e);
      return false;
    }
  }

  async function enforce(email) {
    const active = await checkSubscription(email);
    if (!active) {
      alert("Your label subscription is inactive. Please subscribe to unlock dashboard features.");
      document.querySelectorAll("button").forEach(b => b.disabled = true);
    }
  }

  return { checkSubscription, enforce };

})();
