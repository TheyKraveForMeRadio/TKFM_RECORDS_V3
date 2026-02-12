(function () {
  const CREDIT_KEY = 'tkfm_sponsor_read_credits';
  const LAST_SESSION_KEY = 'tkfm_last_stripe_session';

  function safeParse(v, fallback) {
    try { return JSON.parse(v) ?? fallback; }
    catch { return fallback; }
  }

  function addCredits(amount) {
    const current = Number(localStorage.getItem(CREDIT_KEY) || 0);
    const updated = current + amount;
    localStorage.setItem(CREDIT_KEY, updated);
    return updated;
  }

  function unlockFromSession(session) {
    if (!session || !session.lookup_key) return false;

    let credits = 0;

    // 🔑 MAP STRIPE lookup_keys → sponsor read credits
    switch (session.lookup_key) {
      case 'sponsor_read_5pack':
        credits = 5;
        break;
      case 'sponsor_read_20pack':
        credits = 20;
        break;
      case 'sponsor_read_monthly':
        credits = 30; // monthly allowance
        break;
      default:
        return false;
    }

    addCredits(credits);
    return true;
  }

  function hydrateFromURL() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('session');

    if (!raw) return;

    const session = safeParse(decodeURIComponent(raw), null);
    if (!session) return;

    const last = safeParse(localStorage.getItem(LAST_SESSION_KEY), {});
    if (last.id === session.id) return; // prevent double credit

    if (unlockFromSession(session)) {
      localStorage.setItem(LAST_SESSION_KEY, JSON.stringify({
        id: session.id,
        at: Date.now()
      }));

      window.dispatchEvent(new Event('tkfm:sponsor-credits-updated'));
    }
  }

  document.addEventListener('DOMContentLoaded', hydrateFromURL);
})();
