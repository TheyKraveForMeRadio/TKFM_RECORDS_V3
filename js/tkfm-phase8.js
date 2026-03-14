window.TKFM_PHASE_VIII = {
  signal: (artist, track, action) =>
    fetch('/.netlify/functions/api/culture-signal', {
      method: 'POST',
      body: JSON.stringify({ artist, track, action })
    }),

  score: (track, score) =>
    fetch('/.netlify/functions/api/autopilot-engine', {
      method: 'POST',
      body: JSON.stringify({ track, score })
    }),

  promote: (artist, track) =>
    fetch('/.netlify/functions/api/auto-promote', {
      method: 'POST',
      body: JSON.stringify({ artist, track })
    }),

  monetize: (artist, action) =>
    fetch('/.netlify/functions/api/value-conversion', {
      method: 'POST',
      body: JSON.stringify({ artist, action })
    })
};
