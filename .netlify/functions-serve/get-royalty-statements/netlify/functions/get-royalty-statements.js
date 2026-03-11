// netlify/functions/get-royalty-statements.js
exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };
  const statements = [
    { track: "My First Single", streams: 1200, revenue: 60 },
    { track: "EP Drop", streams: 3400, revenue: 170 },
    { track: "Mixtape Vol 1", streams: 2200, revenue: 110 }
  ];
  const totalRevenue = statements.reduce((sum, s) => sum + s.revenue, 0);
  return {
    statusCode: 200,
    body: JSON.stringify({ statements, totalRevenue })
  };
};
//# sourceMappingURL=get-royalty-statements.js.map
