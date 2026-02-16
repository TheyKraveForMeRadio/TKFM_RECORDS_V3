(() => {
  const mode = (window.TKFM_SITE_MODE || '').toLowerCase();

  if (mode === 'radio') {
    document.documentElement.style.setProperty('--accent', '#22d3ee');
    document.title = 'TKFM RADIO — Independent Artist Power Station';
    return;
  }

  document.documentElement.style.setProperty('--accent', '#facc15');
  document.title = 'TKFM RECORDS — Label OS';
})();
