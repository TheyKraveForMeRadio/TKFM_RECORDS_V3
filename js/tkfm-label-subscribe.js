// js/tkfm-label-subscribe.js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("subscribeBtn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = prompt("Enter your email to start subscription:");
    if (!email) return;

    try {
      const res = await fetch("/.netlify/functions/api/create-label-subscription", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Subscription failed. Check console.");
    }
  });

  // After redirect from success
  if (location.search.includes("success=true")) {
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1); // monthly
    localStorage.setItem("tkfm_label_subscription", JSON.stringify({ active: true, expires }));
  }
});
