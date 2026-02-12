window.TKFM_ROTATION = (function(){
  async function getRotationStatus(email){
    try {
      const res = await fetch("/.netlify/functions/rotation-unlock", {
        method: "POST",
        body: JSON.stringify({ artistEmail: email })
      });
      const data = await res.json();
      return data.rotationStatus.rotation;
    } catch(err){
      console.error(err);
      return "none";
    }
  }

  async function canRotate(artistEmail){
    const rotation = await getRotationStatus(artistEmail);
    return rotation !== "none";
  }

  return { getRotationStatus, canRotate };
})();
