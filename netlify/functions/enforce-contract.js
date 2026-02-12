let contractDB = {}; // { email: accepted: true/false }

exports.handler = async (event) => {
  const { email, accept } = JSON.parse(event.body || "{}");
  if (!email) return { statusCode: 400, body: "Email required" };

  if (accept != null) {
    contractDB[email] = { accepted: !!accept, date: new Date().toISOString() };
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  }

  const status = contractDB[email]?.accepted || false;
  return { statusCode: 200, body: JSON.stringify({ accepted: status }) };
};
