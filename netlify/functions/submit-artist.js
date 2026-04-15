import fetch from "node-fetch";

export async function handler(event) {
  try {
    const data = JSON.parse(event.body);

    const { artistName, email, trackTitle } = data;

    // 👉 EMAIL TO ARTIST (confirmation)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM <no-reply@send.mail.tkfmrecords.com>",
        to: [email],
        subject: "🎧 Submission Received - TKFM",
        html: `
          <h1>🔥 TKFM RECEIVED YOUR TRACK</h1>
          <p>Artist: ${artistName}</p>
          <p>Track: ${trackTitle}</p>
          <p>We’ll review and get back to you.</p>
        `
      })
    });

    // 👉 EMAIL TO YOU (owner alert)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM ALERT <alerts@send.mail.tkfmrecords.com>",
        to: ["tkfmrecords@gmail.com"],
        subject: "🚨 NEW ARTIST SUBMISSION",
        html: `
          <h2>New Submission</h2>
          <p><b>Artist:</b> ${artistName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Track:</b> ${trackTitle}</p>
        `
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
