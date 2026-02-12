async function sendWelcomeEmail() {
  const res = await fetch("/.netlify/functions/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: "artist@example.com",
      subject: "Welcome to TKFM Label",
      message: "Your subscription is active!"
    })
  });

  const data = await res.json();
  console.log("Email result:", data);
}

// Example trigger
sendWelcomeEmail();
