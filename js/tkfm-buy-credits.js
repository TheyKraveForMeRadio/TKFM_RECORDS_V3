async function buyCredits(lookup_key) {
  const email = localStorage.getItem("tkfm_artist_email");
  if (!email) {
    alert("Artist email missing");
    return;
  }

  const res = await fetch("/.netlify/functions/api/create-credit-checkout", {
    method: "POST",
    body: JSON.stringify({ email, lookup_key })
  });

  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

window.TKFM_BUY_CREDITS = { buyCredits };
