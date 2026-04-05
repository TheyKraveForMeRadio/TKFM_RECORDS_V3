/*
 TKFM Records V3 — Auto Radio Rotation Engine
*/

window.TKFM_RADIO = (() => {
  const KEY = "tkfm_radio_rotation";

  function all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function add(track) {
    const list = all();
    list.push({
      id: "radio_" + Date.now(),
      artistEmail: track.artistEmail,
      title: track.title,
      tier: track.tier,
      spins: 0,
      addedAt: new Date().toISOString(),
      active: true
    });
    save(list);
  }

  function eligible(email) {
    return all().filter(t => t.artistEmail === email && t.active);
  }

  function spin(id) {
    const list = all().map(t =>
      t.id === id ? { ...t, spins: t.spins + 1 } : t
    );
    save(list);
  }

  return { add, eligible, spin, all };
})();
