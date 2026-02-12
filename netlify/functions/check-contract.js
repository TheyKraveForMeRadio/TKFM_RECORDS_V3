exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };

  const db = global.artistContracts || {};
  const contract = db[email] || { accepted: false };

  return {
    statusCode: 200,
    body: JSON.stringify({ accepted: contract.accepted }),
  };
};
