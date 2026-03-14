window.TKFM_SOVEREIGN = {
  mintCBDC: (acct, amt) =>
    fetch('/.netlify/functions/api/tkfm-cbdc', {
      method: 'POST',
      body: JSON.stringify({ action: "mint", account: acct, amount: amt })
    }),

  proposeLaw: (title) =>
    fetch('/.netlify/functions/api/label-dao', {
      method: 'POST',
      body: JSON.stringify({ action: "propose", title })
    })
};
