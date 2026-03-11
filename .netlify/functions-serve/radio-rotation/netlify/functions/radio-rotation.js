// netlify/functions/radio-rotation.js
exports.handler = async (event) => {
  try {
    const queue = global.artistTracks || {};
    const rotation = [];
    for (const email in queue) {
      queue[email].forEach((track) => {
        if (track.status === "approved") {
          const tier = track.artistTier || "basic";
          let weight = 1;
          if (tier === "premium") weight = 3;
          if (tier === "vip") weight = 5;
          for (let i = 0; i < weight; i++) rotation.push(track.trackUrl);
        }
      });
    }
    for (let i = rotation.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rotation[i], rotation[j]] = [rotation[j], rotation[i]];
    }
    return { statusCode: 200, body: JSON.stringify({ rotation }) };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=radio-rotation.js.map
