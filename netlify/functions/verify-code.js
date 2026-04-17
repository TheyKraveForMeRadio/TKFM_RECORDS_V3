exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const email = body.email;
    const code = body.code;

    // 🧪 TEMP TEST (REMOVE STRICT CHECK)
    if (!email || !code) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, error: "Missing data" })
      };
    }

    // 🔥 TEMP: ACCEPT ANY CODE (for testing)
    // You can replace this later with DB check
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        user: {
          email
        }
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
