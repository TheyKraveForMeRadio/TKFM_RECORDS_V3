window.TKFM_DISTRIBUTION = (function() {

  async function submitTrack(email, trackName, trackUrl) {
    const res = await fetch("/.netlify/functions/submit-track", {
      method: "POST",
      body: JSON.stringify({ email, trackName, trackUrl })
    });
    return await res.json();
  }

  async function distributeTrack(email, trackIndex) {
    const res = await fetch("/.netlify/functions/distribute-track", {
      method: "POST",
      body: JSON.stringify({ email, trackIndex })
    });
    return await res.json();
  }

  async function listTracks(email) {
    const dbTracks = global.artistTracks || {};
    return dbTracks[email] || [];
  }

  return { submitTrack, distributeTrack, listTracks };

})();
