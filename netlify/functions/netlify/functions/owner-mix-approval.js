exports.handler = async (event) => {
  try {
    const { mixId, action, ownerKey } = JSON.parse(event.body || "{}");
    if (ownerKey !== process.env.TKFM_OWNER_KEY)
      return { statusCode: 403, body: "Unauthorized" };
    if (!mixId || !action || !["approve","reject"].includes(action))
      return { statusCode: 400, body: "Invalid parameters" };

    // Simulate DB update
    const updatedMix = {
      mixId,
      status: action === "approve" ? "approved" : "rejected",
      reviewedAt: Date.now()
    };

    // db.updateMixStatus(updatedMix);

    return { statusCode: 200, body: JSON.stringify({ success: true, updatedMix }) };
  } catch(err){
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
