// netlify/functions/submit-contract.js
exports.handler = async (event) => {
  try {
    const { email, contractAccepted } = JSON.parse(event.body || "{}");
    if (!email || typeof contractAccepted !== "boolean") {
      return { statusCode: 400, body: "Missing parameters" };
    }
    const db = global.artistContracts || {};
    db[email] = { accepted: contractAccepted, timestamp: (/* @__PURE__ */ new Date()).toISOString() };
    global.artistContracts = db;
    return { statusCode: 200, body: JSON.stringify({ success: true, accepted: contractAccepted }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=submit-contract.js.map
