export async function handler(event) {
  const artists = [
    { email: "artist@example.com", streams: 1200, revenue: 84, topTrack: "Hit Single" }
  ];

  for (const a of artists) {
    await fetch(process.env.URL + "/.netlify/functions/api/send-templated-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: a.email,
        type: "weekly_digest",
        data: a
      })
    });
  }

  return { statusCode: 200, body: "digests sent" };
}
