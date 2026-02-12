window.TKFM_AUTO_ROTATE = {
  optimize: async function() {
    const tracks = await TKFM_DISTRIBUTION.listTracks(window.TKFM_EMAIL);
    for (const t of tracks) {
      const res = await fetch('/.netlify/functions/predict-hit', {
        method: 'POST',
        body: JSON.stringify({ trackName: t.trackName, artistEmail: window.TKFM_EMAIL })
      });
      const data = await res.json();
      if (data.prediction === "HIGH_HIT_POTENTIAL") {
        // prioritize for radio rotation
        TKFM_RADIO.addToRotation(t.trackUrl);
      }
    }
  }
};
