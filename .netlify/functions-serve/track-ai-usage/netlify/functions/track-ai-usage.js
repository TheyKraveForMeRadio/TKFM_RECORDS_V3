// netlify/functions/track-ai-usage.js
exports.handler = async (event) => {
  try {
    const { email, engineType, quantity } = JSON.parse(event.body || "{}");
    if (!email || !engineType || !quantity) return { statusCode: 400, body: "Missing parameters" };
    console.log(`Artist ${email} used ${quantity} ${engineType}`);
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=track-ai-usage.js.map
