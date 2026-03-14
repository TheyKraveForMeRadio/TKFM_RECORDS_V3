window.TKFM_PHASE_VII = {
  spawnAIArtist: (genre, persona) =>
    fetch('/.netlify/functions/api/ai-born-artist', {
      method: 'POST',
      body: JSON.stringify({ genre, persona })
    }),

  replicateLabel: (region) =>
    fetch('/.netlify/functions/api/label-replication', {
      method: 'POST',
      body: JSON.stringify({ region })
    }),

  broadcastReality: (track, location) =>
    fetch('/.netlify/functions/api/reality-broadcast', {
      method: 'POST',
      body: JSON.stringify({ track, location })
    })
};
