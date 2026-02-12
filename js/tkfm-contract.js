window.TKFM_CONTRACT = (function() {
  async function submitContract(email, accept) {
    const res = await fetch('/.netlify/functions/enforce-contract', {
      method: 'POST',
      body: JSON.stringify({ email, accept })
    });
    return res.json();
  }

  async function requireContract(email) {
    const res = await fetch(`/.netlify/functions/enforce-contract?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    return data.accepted;
  }

  async function takedownTrack(email, trackIdx) {
    // Lock track from distribution
    if (!window.TKFM_DISTRIBUTION.lockedTracks) window.TKFM_DISTRIBUTION.lockedTracks = {};
    if (!window.TKFM_DISTRIBUTION.lockedTracks[email]) window.TKFM_DISTRIBUTION.lockedTracks[email] = [];
    window.TKFM_DISTRIBUTION.lockedTracks[email].push(trackIdx);
    alert(`Track ${trackIdx + 1} for ${email} has been taken down / locked.`);
  }

  return { submitContract, requireContract, takedownTrack };
})();
