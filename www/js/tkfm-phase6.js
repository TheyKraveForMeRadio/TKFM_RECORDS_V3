window.TKFM_PHASE_VI = {
  registerCitizen: (email, name) =>
    fetch('/.netlify/functions/api/artist-citizenship', {
      method: 'POST',
      body: JSON.stringify({ email, name })
    }),

  enactLaw: (title, rule) =>
    fetch('/.netlify/functions/api/ai-legislation', {
      method: 'POST',
      body: JSON.stringify({ action: "propose", title, rule })
    }),

  summonAICEO: () =>
    fetch('/.netlify/functions/api/ai-ceo')
};
