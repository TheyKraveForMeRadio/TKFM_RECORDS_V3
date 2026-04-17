exports.handler = async (event) => {
  try {
    const { email, code } = JSON.parse(event.body);

    if (!global.loginCodes || global.loginCodes[email] !== code) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid code" })
      };
    }

    delete global.loginCodes[email];

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        token: "tkfm_user_" + Date.now()
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
