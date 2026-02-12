exports.handler = async (event) => {
  const email = event.queryStringParameters?.email;
  if (!email) return { statusCode: 400, body: "Email required" };

  // Simulated royalty data
  // Replace with actual DB or Stripe payout records
  const statements = [
    { track: "My First Single", streams: 1200, revenue: 60.00 },
    { track: "EP Drop", streams: 3400, revenue: 170.00 },
    { track: "Mixtape Vol 1", streams: 2200, revenue: 110.00 },
  ];

  // Total revenue
  const totalRevenue = statements.reduce((sum, s) => sum + s.revenue, 0);

  return {
    statusCode: 200,
    body: JSON.stringify({ statements, totalRevenue }),
  };
};
