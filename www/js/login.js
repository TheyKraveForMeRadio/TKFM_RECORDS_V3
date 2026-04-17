async function sendCode() {
  const email = document.querySelector('input[type="email"]').value;

  const res = await fetch('/.netlify/functions/send-code', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  const data = await res.json();

  if (data.success) {
    alert("Code sent to email");
  } else {
    alert("Error sending code");
  }
}

async function verifyLogin() {
  const email = document.querySelector('input[type="email"]').value;
  const code = document.querySelectorAll('input')[1].value;

  const res = await fetch('/.netlify/functions/verify-code', {
    method: 'POST',
    body: JSON.stringify({ email, code })
  });

  const data = await res.json();

  if (data.success) {
    alert("Logged in!");
    localStorage.setItem("tkfm_user", email);
    window.location.href = "/dashboard.html";
  } else {
    alert("Invalid code");
  }
}
