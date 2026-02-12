window.TKFM_NETWORK = {
  refer: (referrer, newArtist) =>
    fetch('/.netlify/functions/referral-track', {
      method: 'POST',
      body: JSON.stringify({ referrer, newArtist })
    }),

  reward: (referrer) =>
    fetch('/.netlify/functions/referral-reward', {
      method: 'POST',
      body: JSON.stringify({ referrer })
    }),

  createCityNode: (city, founder) =>
    fetch('/.netlify/functions/city-node', {
      method: 'POST',
      body: JSON.stringify({ city, founder })
    }),

  scoreCity: (city, action) =>
    fetch('/.netlify/functions/node-score', {
      method: 'POST',
      body: JSON.stringify({ city, action })
    })
};
