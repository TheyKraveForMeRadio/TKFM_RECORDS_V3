window.TKFM_AI_DJ = (function(){
  async function scheduleDrop(trackUrl, artistEmail, creditsRequired){
    // Check credits
    const res = await fetch('/.netlify/functions/api/use-credit', {
      method:'POST',
      body: JSON.stringify({ email: artistEmail, creditType: creditsRequired })
    });
    const data = await res.json();
    if(!data.success) return alert("Not enough credits");

    // Mint Token for drop
    await fetch('/.netlify/functions/api/mint-token', {
      method:'POST',
      body: JSON.stringify({ email:artistEmail, tokenId:1, amount:1 })
    });

    // Add to auto-rotation
    TKFM_RADIO.addTrack(trackUrl, artistEmail);
    alert("AI DJ Drop scheduled and minted!");
  }

  return { scheduleDrop };
})();
