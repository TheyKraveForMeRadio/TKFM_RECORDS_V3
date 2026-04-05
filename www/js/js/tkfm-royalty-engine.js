/*
 TKFM Records V3 — Royalty Engine
 Owner-controlled, immutable splits
*/

window.TKFM_ROYALTY = (() => {
  const SPLIT_KEY = "tkfm_royalty_splits";
  const EARNINGS_KEY = "tkfm_royalty_earnings";

  function getSplits() {
    return JSON.parse(localStorage.getItem(SPLIT_KEY) || "[]");
  }

  function getEarnings() {
    return JSON.parse(localStorage.getItem(EARNINGS_KEY) || "[]");
  }

  function createSplit({ trackId, artistEmail, artistPct, labelPct, producerPct }) {
    const splits = getSplits();

    if (artistPct + labelPct + producerPct !== 100) {
      throw new Error("Splits must equal 100%");
    }

    splits.push({
      trackId,
      artistEmail,
      artistPct,
      labelPct,
      producerPct,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem(SPLIT_KEY, JSON.stringify(splits));
  }

  function logEarning({ trackId, source, amount }) {
    const earnings = getEarnings();
    earnings.push({
      trackId,
      source,
      amount,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem(EARNINGS_KEY, JSON.stringify(earnings));
  }

  function generateStatement(artistEmail) {
    const splits = getSplits().filter(s => s.artistEmail === artistEmail);
    const earnings = getEarnings();

    let total = 0;
    const breakdown = [];

    splits.forEach(split => {
      earnings
        .filter(e => e.trackId === split.trackId)
        .forEach(e => {
          const artistShare = (e.amount * split.artistPct) / 100;
          total += artistShare;
          breakdown.push({
            trackId: split.trackId,
            source: e.source,
            gross: e.amount,
            artistShare
          });
        });
    });

    return {
      artistEmail,
      total,
      breakdown
    };
  }

  return {
    createSplit,
    logEarning,
    generateStatement
  };
})();
