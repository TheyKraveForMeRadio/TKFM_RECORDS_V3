window.TKFM_OWNER_MIX = (function() {

  async function approveTrack(email, trackIndex) {
    const res = await fetch("/.netlify/functions/owner-approve-track", {
      method: "POST",
      body: JSON.stringify({ email, trackIndex, action: "approve" })
    });
    return await res.json();
  }

  async function requestChanges(email, trackIndex) {
    const res = await fetch("/.netlify/functions/owner-approve-track", {
      method: "POST",
      body: JSON.stringify({ email, trackIndex, action: "request_changes" })
    });
    return await res.json();
  }

  async function listSubmittedTracks() {
    return global.artistTracks || {};
  }

  return { approveTrack, requestChanges, listSubmittedTracks };

})();
