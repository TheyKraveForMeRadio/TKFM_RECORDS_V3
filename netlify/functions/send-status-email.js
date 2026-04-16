import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { email, artistName, trackTitle, status } = JSON.parse(event.body);

    let subject, html;

    if (status === "approved") {
      subject = "🔥 TKFM APPROVED YOUR TRACK";
      html = `
        <h1>🚀 You're Approved</h1>
        <p>${artistName} - ${trackTitle}</p>
        <p>Your track is moving forward in TKFM.</p>
      `;
    } else {
      subject = "❌ TKFM Submission Update";
      html = `
        <h1>Submission Update</h1>
        <p>${artistName} - ${trackTitle}</p>
        <p>Not selected this round. Keep submitting.</p>
      `;
    }

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM <no-reply@send.mail.tkfmrecords.com>",
        to: [email],
        subject,
        html
      })
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
