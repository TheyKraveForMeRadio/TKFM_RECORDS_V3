async function loadUser() {
  const email = document.getElementById("emailInput").value;

  if (!email) return alert("Enter email");

  const res = await fetch(`/.netlify/functions/get-user-dashboard?user=${encodeURIComponent(email)}`);
  const json = await res.json();

  if (!json.data) return alert("User not found");

  const user = json.data;

  document.getElementById("email").innerText = user.email;
  document.getElementById("name").innerText = user.name || "New User";
  document.getElementById("plan").innerText = user.label_plan || "Free";
  document.getElementById("subscription").innerText = user.subscription_active ? "Active" : "Inactive";

  let credits = 0;
  if (user.credits) {
    credits = Object.values(user.credits).reduce((a, b) => a + (b || 0), 0);
  }

  document.getElementById("credits").innerText = credits;

  window.currentUserEmail = user.email;
}

async function buyCredits() {
  if (!window.currentUserEmail) {
    alert("Load user first");
    return;
  }

  const res = await fetch('/.netlify/functions/create-checkout-session', {
    method: 'POST',
    body: JSON.stringify({
      email: window.currentUserEmail,
      lookup_key: "drop_pack_10"
    })
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Checkout failed");
  }
}

function upgradePlan() {
  alert("Hook subscription plan here next");
}

function submitTrack() {
  window.location.href = "/submit.html";
}

window.loadUser = loadUser;
window.buyCredits = buyCredits;
