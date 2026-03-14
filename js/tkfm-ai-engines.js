window.TKFM_AI_ENGINES = (() => {

  async function getCredits(email) {
    const res = await fetch(`/.netlify/functions/api/get-credits?email=${encodeURIComponent(email)}`);
    return res.json();
  }

  async function useCredit(email, key) {
    const res = await fetch('/.netlify/functions/api/use-credit', {
      method: 'POST',
      body: JSON.stringify({ email, key })
    });
    if (!res.ok) throw new Error("No credits");
    return res.json();
  }

  async function masterTrack(trackPath) {
    return new Promise(res =>
      setTimeout(() => res(trackPath.replace(".mp3", "_mastered.mp3")), 1500)
    );
  }

  async function generateCatalog() {
    const div = document.getElementById("artistCatalog");
    div.innerHTML = "<ul><li>Single</li><li>EP</li><li>Album</li></ul>";
  }

  async function useDrop(key) {
    await useCredit(window.TKFM_EMAIL, key);
    return `/drops/drop-${Date.now()}.mp3`;
  }

  async function useSponsorRead(key) {
    await useCredit(window.TKFM_EMAIL, key);
    return "Sponsor Read Generated";
  }

  async function refreshUI() {
    const credits = await getCredits(window.TKFM_EMAIL);
    document.querySelectorAll("[data-credit]").forEach(btn => {
      const key = btn.dataset.credit;
      btn.disabled = credits[key] <= 0;
      btn.innerText = `${btn.innerText.split("(")[0]} (${credits[key]})`;
    });
  }

  return {
    masterTrack,
    generateCatalog,
    useDrop,
    useSponsorRead,
    refreshUI
  };
})();
