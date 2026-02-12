exports.handler = async (event) => {
  try {
    const { artistEmail, trackId } = JSON.parse(event.body || "{}");
    if (!artistEmail || !trackId) return { statusCode: 400, body: "Missing parameters" };

    // Fetch contract status (DB / Stripe check simulated)
    const contractActive = true; // replace with real DB lookup

    if(!contractActive){
      return { statusCode: 403, body: "Contract not active. Track locked." };
    }

    return { statusCode: 200, body: JSON.stringify({ allowed: true }) };
  } catch(err){
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
