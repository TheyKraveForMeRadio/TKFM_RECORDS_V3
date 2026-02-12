const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Simulated DB for track earnings
let trackEarningsDB = {}; // { email: [{ trackName, revenue, splits }] }

exports.handler = async (event) => {
  const { email, trackName, revenue } = JSON.parse(event.body || "{}");
  if (!email || !trackName || revenue == null) return { statusCode: 400, body: "Missing parameters" };

  const artistSplit = 0.7; // 70% to artist
  const labelSplit = 0.3;  // 30% to label

  const splits = {
    artist: parseFloat((revenue * artistSplit).toFixed(2)),
    label: parseFloat((revenue * labelSplit).toFixed(2))
  };

  if (!trackEarningsDB[email]) trackEarningsDB[email] = [];
  trackEarningsDB[email].push({ trackName, revenue, splits, date: new Date().toISOString() });

  return { statusCode: 200, body: JSON.stringify({ success: true, splits }) };
};
