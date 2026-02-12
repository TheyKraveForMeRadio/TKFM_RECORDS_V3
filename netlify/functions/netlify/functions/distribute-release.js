exports.handler = async (event) => {
  try {
    const { artistEmail, releaseId, distributionType } = JSON.parse(event.body || "{}");
    if (!artistEmail || !releaseId || !distributionType)
      return { statusCode: 400, body: "Missing parameters" };

    // Example distribution logic
    // distributionType: "single", "artist_monthly", "label_monthly"
    const catalogEntry = {
      releaseId,
      artistEmail,
      type: distributionType,
      timestamp: Date.now(),
      status: "queued",
    };

    // Save catalogEntry to DB / JSON (simulate)
    // db.save(catalogEntry);

    return { statusCode: 200, body: JSON.stringify({ success: true, catalogEntry }) };
  } catch(err){
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
