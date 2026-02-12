exports.handler = async (event) => {
  try {
    const { email, trackIndex } = JSON.parse(event.body || "{}");
    const dbTracks = global.artistTracks || {};
    if (!dbTracks[email]?.[trackIndex]) return { statusCode: 404, body: "Track not found" };

    const track = dbTracks[email][trackIndex];

    // Simulate distribution to streaming platforms
    track.status = "distributed";
    track.distributedAt = new Date().toISOString();
    track.platformUrls = {
      spotify: `https://spotify.com/track/${Date.now()}`,
      apple: `https://music.apple.com/track/${Date.now()}`,
      tiktok: `https://www.tiktok.com/music/${Date.now()}`
    };

    return { statusCode: 200, body: JSON.stringify({ success: true, track }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
