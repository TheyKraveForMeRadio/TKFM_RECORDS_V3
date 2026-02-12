window.TKFM_CONTRACT_GATE = (function(){
  async function checkAccess(artistEmail, trackId){
    try {
      const res = await fetch("/.netlify/functions/enforce-contract", {
        method: "POST",
        body: JSON.stringify({ artistEmail, trackId })
      });
      const data = await res.json();
      if(res.status === 200 && data.allowed){
        return true;
      }
      alert("Access denied. Contract not active or track locked.");
      return false;
    } catch(err){
      console.error(err);
      alert("Error verifying contract.");
      return false;
    }
  }
  return { checkAccess };
})();
