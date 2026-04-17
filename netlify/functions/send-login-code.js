const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Email required" })
      };
    }

    // generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // store in memory (temporary)
    global.loginCodes = global.loginCodes || {};
    global.loginCodes[email] = code;

    // send email via Resend
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
        html: `<h1>${code}</h1><p>Your login code</p>`
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
