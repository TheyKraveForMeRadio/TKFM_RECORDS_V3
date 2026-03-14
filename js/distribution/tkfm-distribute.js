window.TKFM_DISTRIBUTE = (function(){
  async function submitRelease(artistEmail, releaseId, distributionType){
    try {
      const res = await fetch("/.netlify/functions/api/distribute-release", {
        method: "POST",
        body: JSON.stringify({ artistEmail, releaseId, distributionType })
      });
      const data = await res.json();
      if(res.status === 200 && data.success){
        alert(`Release queued successfully: ${distributionType}`);
        return true;
      }
      alert("Failed to queue release.");
      return false;
    } catch(err){
      console.error(err);
      alert("Error submitting release.");
      return false;
    }
  }
  return { submitRelease };
})();
