window.TKFM_TOKEN = {
  async mintToken(artistAddress, tokenId, amount) {
    const res = await fetch('/.netlify/functions/mint-token', {
      method: 'POST',
      body: JSON.stringify({ artistAddress, tokenId, amount })
    });
    return await res.json();
  },
  async useCredit(email, creditType) {
    const res = await fetch('/.netlify/functions/use-credit', {
      method: 'POST',
      body: JSON.stringify({ email, creditType })
    });
    return await res.json();
  },
  async recordRadioPlay(trackName, artistEmail) {
    const res = await fetch('/.netlify/functions/radio-play', {
      method: 'POST',
      body: JSON.stringify({ trackName, artistAddress: artistEmail })
    });
    return await res.json();
  }
};
