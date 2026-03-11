// netlify/functions/submit-track.js
exports.handler = async (event) => {
  try {
    const { email, trackName, trackUrl } = JSON.parse(event.body || "{}");
    if (!email || !trackName || !trackUrl) {
      return { statusCode: 400, body: "Missing parameters" };
    }
    const dbContracts = global.artistContracts || {};
    if (!dbContracts[email]?.accepted) {
      return { statusCode: 403, body: "Contract not accepted" };
    }
    const dbTracks = global.artistTracks || {};
    if (!dbTracks[email]) dbTracks[email] = [];
    dbTracks[email].push({ trackName, trackUrl, status: "submitted", submittedAt: (/* @__PURE__ */ new Date()).toISOString() });
    global.artistTracks = dbTracks;
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=submit-track.js.map
