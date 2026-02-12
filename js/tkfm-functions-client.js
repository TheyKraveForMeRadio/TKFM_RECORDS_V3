/*
TKFM Client Functions
Shared helpers for V3 Sponsor Read Engine, credits wallet, and Stripe checkout
*/
async function fetchJSON(url, options={}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
}

async function getCustomerCredits() {
    try {
        const data = await fetchJSON('/.netlify/functions/sponsor-credits-get');
        return data.credits || 0;
    } catch(e) {
        console.error(e);
        return 0;
    }
}

async function addCredits(packKey) {
    return fetchJSON(`/api/add-credits?pack=${packKey}`);
}

async function useCredit() {
    return fetchJSON(`/api/use-credit`);
}

function showMessage(msg, type='info') {
    const el = document.getElementById('msg');
    if (!el) return;
    el.style.display = 'block';
    el.textContent = msg;
    el.style.borderColor = type==='warn'? 'rgba(250,204,21,0.22)' : 'rgba(34,211,238,0.22)';
    el.style.backgroundColor = type==='warn'? 'rgba(250,204,21,0.08)' : 'rgba(34,211,238,0.08)';
}
