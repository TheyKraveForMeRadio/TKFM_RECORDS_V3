exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };

  // Replace with DB later — V3 local enforcement
  return {
    statusCode: 200,
    body: JSON.stringify({
      email,
      status: "active" // active | breach | terminated
    })
  };
};
