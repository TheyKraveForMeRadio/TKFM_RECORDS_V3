export async function handler(event) {
  const { email, creditType, remaining } = JSON.parse(event.body);

  if (remaining <= 2) {
    await fetch(process.env.URL + "/.netlify/functions/api/send-templated-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        type: "credits_low",
        data: { creditType }
      })
    });
  }

  return { statusCode: 200, body: "checked" };
}
