const API_BASE = "https://tkfmrecords.netlify.app";

async function sendCode() {
  const email = document.querySelector('input[type="email"]').value;

  const res = await fetch(`${API_BASE}/.netlify/functions/send-code`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  console.log("SEND CODE RESPONSE:", data);

  if (data.success) {
    alert("✅ Code sent to email");
  } else {
    alert("❌ Error sending code");
  }
}

async function verifyLogin() {
  const email = document.querySelector('input[type="email"]').value;
  const code = document.querySelectorAll('input')[1].value;

  const res = await fetch(`${API_BASE}/.netlify/functions/verify-code`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, code })
  });

  const data = await res.json();
  console.log("VERIFY RESPONSE:", data);

  if (data.success) {
    localStorage.setItem("tkfm_user", email);
    window.location.href = "/dashboard.html";
  } else {
    alert("❌ Invalid code");
  }
}
