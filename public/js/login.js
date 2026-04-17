const emailInput = document.querySelector('input[placeholder="Enter your email"]');
const codeInput = document.querySelector('input[placeholder="Enter 6-digit code"]');

window.sendCode = async () => {
  const email = emailInput.value;

  const res = await fetch('/.netlify/functions/send-login-code', {
    method: 'POST',
    body: JSON.stringify({ email })
  });

  alert("Code sent to email");
};

window.verifyLogin = async () => {
  const email = emailInput.value;
  const code = codeInput.value;

  const res = await fetch('/.netlify/functions/verify-login', {
    method: 'POST',
    body: JSON.stringify({ email, code })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("tkfm_token", data.token);
    alert("Logged in");
    window.location.href = "/app.html";
  } else {
    alert("Invalid code");
  }
};
