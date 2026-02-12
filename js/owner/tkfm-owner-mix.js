window.TKFM_OWNER_MIX = (function(){
  async function reviewMix(mixId, action){
    try {
      const res = await fetch("/.netlify/functions/owner-mix-approval", {
        method: "POST",
        body: JSON.stringify({
          mixId,
          action,
          ownerKey: localStorage.getItem("TKFM_OWNER_KEY")
        })
      });
      const data = await res.json();
      if(res.status === 200 && data.success){
        alert(`Mix ${action}ed successfully`);
        return true;
      }
      alert("Failed to update mix status.");
      return false;
    } catch(err){
      console.error(err);
      alert("Error reviewing mix.");
      return false;
    }
  }
  return { reviewMix };
})();
