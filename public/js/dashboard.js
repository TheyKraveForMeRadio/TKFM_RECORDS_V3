async function loadUser() {
  const email = document.getElementById("emailInput").value;

  if (!email) {
    alert("Enter email");
    return;
  }

  try {
    const res = await fetch(`/.netlify/functions/get-user-dashboard?user=${encodeURIComponent(email)}`);
    const json = await res.json();

    console.log("USER:", json);

    if (!json.data) {
      alert("User not found");
      return;
    }

    const user = json.data;

    document.getElementById("email").innerText = user.email || "-";
    document.getElementById("name").innerText = user.name || "New User";
    document.getElementById("plan").innerText = user.label_plan || "Free";
    document.getElementById("subscription").innerText = user.subscription_active ? "Active" : "Inactive";

    // credits object safe read
    let credits = 0;
    if (user.credits && typeof user.credits === "object") {
      credits = Object.values(user.credits).reduce((a, b) => a + (b || 0), 0);
    }

    document.getElementById("credits").innerText = credits;

  } catch (err) {
    console.error(err);
    alert("Error loading dashboard");
  }
}

function buyCredits() {
  alert("Hook Stripe here");
}

function upgradePlan() {
  alert("Hook Stripe plan upgrade");
}

function submitTrack() {
  window.location.href = "/submit.html";
}

window.loadUser = loadUser;
