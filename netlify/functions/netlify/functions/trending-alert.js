export async function handler(event) {
  const { email, track } = JSON.parse(event.body);

  await fetch(process.env.URL + "/.netlify/functions/send-templated-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: email,
      type: "trending",
      data: { track }
    })
  });

  return { statusCode: 200, body: "alerted" };
}
