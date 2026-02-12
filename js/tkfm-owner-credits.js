window.TKFM_OWNER_CREDITS = {
  async adjust(email, key, amount) {
    const res = await fetch('/.netlify/functions/owner-adjust-credits', {
      method: 'POST',
      body: JSON.stringify({
        owner_key: localStorage.getItem('TKFM_OWNER_KEY'),
        email,
        credit_key: key,
        amount
      })
    });
    return res.text();
  }
};
