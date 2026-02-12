exports.handler = async (event) => {
  try {
    const { email, contractAccepted } = JSON.parse(event.body || "{}");
    if (!email || typeof contractAccepted !== "boolean") {
      return { statusCode: 400, body: "Missing parameters" };
    }

    // Simulate DB write (replace with real DB)
    const db = global.artistContracts || {};
    db[email] = { accepted: contractAccepted, timestamp: new Date().toISOString() };
    global.artistContracts = db;

    return { statusCode: 200, body: JSON.stringify({ success: true, accepted: contractAccepted }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
