window.TKFM_TOKEN_NETWORK = {
  async mint(email, type, amount, wallet) {
    const res = await fetch('/.netlify/functions/mint-token', {
      method: 'POST',
      body: JSON.stringify({ email, token_type: type, amount, wallet_address: wallet })
    });
    const data = await res.json();
    TKFM_AI_ENGINES.refreshUI();
    return data;
  },
  async log(action, details) {
    await fetch('/.netlify/functions/ledger-log', {
      method: 'POST',
      body: JSON.stringify({ actor: window.TKFM_EMAIL, action_type: action, details })
    });
  }
};
