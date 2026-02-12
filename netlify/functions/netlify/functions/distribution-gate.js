exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };

  // Future: Stripe + DB enforcement
  return {
    statusCode: 200,
    body: JSON.stringify({
      allowed: true,
      reason: "Contract active"
    })
  };
};
