document.getElementById("subscribeBtn").addEventListener("click", async () => {
  const email = prompt("Enter your email to start subscription:");
  if (!email) return;

  const res = await fetch("/.netlify/functions/api/create-label-subscription", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  window.location.href = data.url;
});

if (location.search.includes("success=true")) {
  const expires = new Date();
  expires.setMonth(expires.getMonth() + 1);
  localStorage.setItem("tkfm_label_subscription", JSON.stringify({ active: true, expires }));
}
