let trackEarningsDB = {}; // same DB reference as track-royalty.js

exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };
  
  const data = trackEarningsDB[email] || [];
  return { statusCode: 200, body: JSON.stringify({ earnings: data }) };
};
