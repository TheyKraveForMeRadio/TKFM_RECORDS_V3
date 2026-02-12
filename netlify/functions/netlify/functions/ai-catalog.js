exports.handler = async (event) => {
  try {
    const { artistEmail } = JSON.parse(event.body || "{}");
    if (!artistEmail) return { statusCode: 400, body: "Missing parameters" };

    // Fetch artist tracks (placeholder)
    const tracks = [
      { title: "Track 1", url: "/tracks/track1.mp3" },
      { title: "Track 2", url: "/tracks/track2.mp3" },
    ];

    // Generate catalog page structure
    const catalog = tracks.map(t => `<div class="track"><a href="${t.url}">${t.title}</a></div>`).join("");

    return {
      statusCode: 200,
      body: JSON.stringify({ catalogHtml: `<div class="artist-catalog">${catalog}</div>` }),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
