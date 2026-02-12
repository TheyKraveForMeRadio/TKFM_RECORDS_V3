export async function handler(event) {
  try {
    const { to, subject, message } = JSON.parse(event.body || "{}");

    if (!to || !subject || !message) {
      return { statusCode: 400, body: "Missing fields" };
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM Label <noreply@tkfmrecords.com>",
        to,
        subject,
        html: `<p>${message}</p>`
      })
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
