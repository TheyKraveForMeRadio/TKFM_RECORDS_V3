// netlify/functions/sponsor-read-engine.js
var sponsorCredits = {};
exports.handler = async (event) => {
  try {
    const { artistEmail, readPackKey } = JSON.parse(event.body || "{}");
    if (!artistEmail || !readPackKey) return { statusCode: 400, body: "Missing parameters" };
    sponsorCredits[artistEmail] = sponsorCredits[artistEmail] || 0;
    if (sponsorCredits[artistEmail] < 1) {
      return { statusCode: 400, body: "Not enough sponsor credits" };
    }
    sponsorCredits[artistEmail] -= 1;
    const sponsorUrl = `https://tkfmrecords.com/sponsor-reads/${Date.now()}-${readPackKey}.mp3`;
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, url: sponsorUrl, remainingCredits: sponsorCredits[artistEmail] })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=sponsor-read-engine.js.map
