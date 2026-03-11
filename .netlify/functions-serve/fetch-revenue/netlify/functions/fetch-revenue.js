// netlify/functions/fetch-revenue.js
var ARTISTS_DB = [
  { email: "artist1@example.com", active: true, monthlyFee: 49 },
  { email: "artist2@example.com", active: false, monthlyFee: 49 }
  // Add real artist records or connect to DB
];
exports.handler = async () => {
  try {
    const totalIncome = ARTISTS_DB.reduce((sum, a) => sum + (a.active ? a.monthlyFee : 0), 0);
    const activeSubs = ARTISTS_DB.filter((a) => a.active).length;
    const pendingPayouts = 0;
    return {
      statusCode: 200,
      body: JSON.stringify({ totalIncome, activeSubs, pendingPayouts })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=fetch-revenue.js.map
