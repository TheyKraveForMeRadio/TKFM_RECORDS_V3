/*
 TKFM Records V3 — Royalty Engine
*/

window.TKFM_ROYALTIES = (() => {
  const KEY = "tkfm_royalty_ledger";

  function all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function add(entry) {
    const list = all();
    list.push({
      id: "roy_" + Date.now(),
      artistEmail: entry.artistEmail,
      track: entry.track,
      source: entry.source, // radio | distribution | sync | other
      gross: Number(entry.gross || 0),
      artistSplit: Number(entry.artistSplit || 0.7),
      labelSplit: Number(entry.labelSplit || 0.3),
      artistEarnings: Number(entry.gross || 0) * Number(entry.artistSplit || 0.7),
      labelEarnings: Number(entry.gross || 0) * Number(entry.labelSplit || 0.3),
      createdAt: new Date().toISOString(),
      paid: false
    });
    save(list);
  }

  function byArtist(email) {
    return all().filter(r => r.artistEmail === email);
  }

  function balance(email) {
    return byArtist(email)
      .filter(r => !r.paid)
      .reduce((t, r) => t + r.artistEarnings, 0);
  }

  function markPaid(ids) {
    const list = all().map(r =>
      ids.includes(r.id) ? { ...r, paid: true } : r
    );
    save(list);
  }

  return { add, byArtist, balance, markPaid, all };
})();
