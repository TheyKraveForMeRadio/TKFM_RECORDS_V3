/*
 TKFM Records V3 — Mix Approval Workflow
*/

window.TKFM_MIXES = (() => {
  const KEY = "tkfm_mix_submissions";

  function all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function submit(data) {
    const list = all();
    list.push({
      id: "mix_" + Date.now(),
      artistEmail: data.artistEmail,
      title: data.title,
      version: "v1",
      status: "submitted", // submitted | revision | approved | rejected
      notes: "",
      submittedAt: new Date().toISOString()
    });
    save(list);
  }

  function update(id, patch) {
    const list = all().map(m =>
      m.id === id ? { ...m, ...patch, updatedAt: new Date().toISOString() } : m
    );
    save(list);
  }

  function byArtist(email) {
    return all().filter(m => m.artistEmail === email);
  }

  return { submit, update, all, byArtist };
})();
