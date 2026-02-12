/*
 TKFM Records V3 — Contract Enforcement Engine
 Owner controlled. Non-negotiable.
*/

window.TKFM_CONTRACT = (() => {
  const KEY = "tkfm_contracts";

  function all() {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function setStatus({ artistEmail, status, reason }) {
    const list = all().filter(c => c.artistEmail !== artistEmail);
    list.push({
      artistEmail,
      status, // active | breach | terminated
      reason: reason || "",
      updatedAt: new Date().toISOString()
    });
    save(list);
  }

  function getStatus(artistEmail) {
    return all().find(c => c.artistEmail === artistEmail) || {
      status: "inactive"
    };
  }

  function isLocked(artistEmail) {
    const s = getStatus(artistEmail).status;
    return s === "breach" || s === "terminated";
  }

  return {
    setStatus,
    getStatus,
    isLocked
  };
})();
