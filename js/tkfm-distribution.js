window.TKFM_DISTRIBUTION = (function() {

  async function submitTrack(email, trackName, trackUrl) {
    const res = await fetch('/.netlify/functions/submit-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, trackName, trackUrl })
    });
    return res.json();
  }

  async function listTracks(email) {
    const res = await fetch(`/.netlify/functions/get-tracks?email=${encodeURIComponent(email)}`);
    
    if (!res.ok) return [];
    return res.json();
  }

  async function distributeTrack(email, index) {
    const res = await fetch('/.netlify/functions/distribute-track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, index })
    });
    return res.json();
  }

  return { submitTrack, listTracks, distributeTrack };

})();
