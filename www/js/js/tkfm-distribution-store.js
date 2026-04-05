/*
 TKFM Records V3 — Distribution Store
*/

window.TKFM_DISTRIBUTION = (() => {
  const KEY = "tkfm_distribution_releases";

  function all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function submit(release) {
    const list = all();
    list.push({
      ...release,
      id: "rel_" + Date.now(),
      status: "submitted", // submitted | approved | distributed | rejected
      submittedAt: new Date().toISOString()
    });
    save(list);
  }

  function update(id, status) {
    const list = all().map(r =>
      r.id === id ? { ...r, status, updatedAt: new Date().toISOString() } : r
    );
    save(list);
  }

  function byArtist(email) {
    return all().filter(r => r.artistEmail === email);
  }

  return { submit, update, all, byArtist };
})();
