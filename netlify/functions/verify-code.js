exports.handler = async (event) => {
  try {
    const { email, code } = JSON.parse(event.body);

    global.codes = global.codes || {};

    if (global.codes[email] === code) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true })
      };
    }

    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Invalid code" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
