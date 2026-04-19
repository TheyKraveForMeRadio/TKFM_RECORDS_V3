async function getUserDashboard(email) {
  try {
    const res = await fetch(`/.netlify/functions/get-user-dashboard?user=${email}`);
    const data = await res.json();

    console.log("USER DATA:", data);

    // Example: update UI
    if (data.data) {
      document.getElementById("user-email").innerText = data.data.email;
      document.getElementById("user-plan").innerText = data.data.label_plan || "Free";
      document.getElementById("user-sub").innerText = data.data.subscription_active ? "Active" : "Inactive";
    }

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
