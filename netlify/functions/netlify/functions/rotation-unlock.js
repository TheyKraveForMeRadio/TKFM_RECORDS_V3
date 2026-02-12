exports.handler = async (event) => {
  try {
    const { artistEmail } = JSON.parse(event.body || "{}");
    if (!artistEmail) return { statusCode: 400, body: "Email required" };

    // Example tier lookup (replace with real DB/Stripe tier check)
    const tiers = {
      "free": { rotation: "none" },
      "monthly": { rotation: "limited" },
      "pro": { rotation: "full" }
    };

    // Simulate lookup
    const userTier = "monthly"; // TODO: fetch real user tier
    const rotationStatus = tiers[userTier] || { rotation: "none" };

    return { statusCode: 200, body: JSON.stringify({ artistEmail, rotationStatus }) };
  } catch(err){
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
