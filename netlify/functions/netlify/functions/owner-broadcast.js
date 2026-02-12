export async function handler(event) {
  const { subject, message, recipients } = JSON.parse(event.body);

  for (const email of recipients) {
    await fetch(process.env.URL + "/.netlify/functions/send-templated-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        type: "owner_broadcast",
        data: { subject, message }
      })
    });
  }

  return { statusCode: 200, body: "broadcast sent" };
}
