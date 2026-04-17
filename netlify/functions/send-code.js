const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // TEMP store (simple for now)
    global.codes = global.codes || {};
    global.codes[email] = code;

    // SEND EMAIL VIA RESEND
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "TKFM <no-reply@send.mail.tkfmrecords.com>",
        to: [email],
        subject: "Your TKFM Login Code",
        html: `<h2>Your code: ${code}</h2>`
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
};
