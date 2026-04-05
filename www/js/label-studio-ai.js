exports.handler = async (event) => {
  try {
    const { trackId, artistEmail } = JSON.parse(event.body || "{}");
    if (!trackId || !artistEmail) return { statusCode: 400, body: "Missing parameters" };

    const suggestions = {
      eq: "Boost mids, lower lows",
      compression: "Moderate",
      fx: ["Reverb", "Delay"]
    };

    return { statusCode: 200, body: JSON.stringify({ success: true, suggestions }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
