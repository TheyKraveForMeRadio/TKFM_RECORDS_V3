exports.handler = async (event) => {
  try {
    const { trackId, source, amount } = JSON.parse(event.body || "{}");
    if (!trackId || !amount) {
      return { statusCode: 400, body: "Missing params" };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        trackId,
        source,
        amount,
        logged: true
      })
    };
  } catch (e) {
    return { statusCode: 500, body: "Server error" };
  }
};
