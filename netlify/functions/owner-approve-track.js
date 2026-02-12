exports.handler = async (event) => {
  try {
    const { email, trackIndex, action } = JSON.parse(event.body || "{}");
    if (!email || trackIndex === undefined || !action) {
      return { statusCode: 400, body: "Missing parameters" };
    }

    const dbTracks = global.artistTracks || {};
    if (!dbTracks[email]?.[trackIndex]) return { statusCode: 404, body: "Track not found" };

    const track = dbTracks[email][trackIndex];
    if (action === "approve") {
      track.status = "approved";
      track.approvedAt = new Date().toISOString();
    } else if (action === "request_changes") {
      track.status = "needs_changes";
      track.changeRequestedAt = new Date().toISOString();
    } else {
      return { statusCode: 400, body: "Invalid action" };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true, track }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
