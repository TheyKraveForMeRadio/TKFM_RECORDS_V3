// netlify/functions/get-royalties.js
var trackEarningsDB = {};
exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };
  const data = trackEarningsDB[email] || [];
  return { statusCode: 200, body: JSON.stringify({ earnings: data }) };
};
//# sourceMappingURL=get-royalties.js.map
