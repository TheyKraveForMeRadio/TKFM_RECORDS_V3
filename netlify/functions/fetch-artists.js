const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Simulated DB / storage
const ARTISTS_DB = [
  { email: "artist1@example.com", active: true, monthlyFee: 49, aiDropsUsed: 5, sponsorReadsUsed: 2, masteredTracks: 3, catalogsGenerated: 1 },
  { email: "artist2@example.com", active: false, monthlyFee: 49, aiDropsUsed: 0, sponsorReadsUsed: 0, masteredTracks: 0, catalogsGenerated: 0 },
  // Add real artist records or connect to DB
];

exports.handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify(ARTISTS_DB),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
