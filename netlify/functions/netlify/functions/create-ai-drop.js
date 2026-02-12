const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const { artistEmail, dropPackKey } = JSON.parse(event.body || "{}");
    if (!artistEmail || !dropPackKey) return { statusCode: 400, body: "Missing parameters" };

    // AI drop creation logic (OpenAI / custom)
    const dropUrl = `https://tkfmrecords.com/drops/${Date.now()}-${dropPackKey}.mp3`;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, url: dropUrl }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
