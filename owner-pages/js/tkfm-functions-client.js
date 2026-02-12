/*
TKFM Client Functions — V3
Shared helpers for Sponsor Read Engine, credits wallet, and Stripe checkout
*/
async function fetchJSON(url, options={}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    return res.json();
}

// Get Stripe customer ID and credits
async function getCustomerInfo() {
    try {
        const data = await fetchJSON('/.netlify/functions/sponsor-credits-get');
        const custIdElem = document.getElementById('custId');
        const creditsElem = document.getElementById('credits');
        if(custIdElem) custIdElem.textContent = data.customerId || '—';
        if(creditsElem) creditsElem.textContent = data.credits || 0;
        return data;
    } catch(e){
        console.error('Failed to fetch customer info:', e);
        return {customerId:null, credits:0};
    }
}

// Add credits for a specific pack
async function addCredits(packKey) {
    try {
        return await fetchJSON(`/api/add-credits?pack=${packKey}`);
    } catch(e){
        console.error('Failed to add credits:', e);
    }
}

// Detect 'pack' from URL (success page redirect)
function getPackFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('pack');
}

// Auto-credit after returning from Stripe
async function handleSuccessCredit() {
    const pack = getPackFromUrl();
    if(pack){
        try{
            await addCredits(pack);
            console.log(`Credits added for pack: ${pack}`);
            // Remove query param so refresh doesn't duplicate credits
            const url = new URL(window.location.href);
            url.searchParams.delete('pack');
            window.history.replaceState({}, '', url.toString());
        } catch(e){
            console.error('Failed to auto-credit pack:', e);
        }
    }
}

// Refresh credits and customer info UI
async function refreshCreditsUI() {
    await getCustomerInfo();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async ()=>{
    await handleSuccessCredit();
    await refreshCreditsUI();
    
    const refreshBtn = document.getElementById('refreshBtn');
    if(refreshBtn) refreshBtn.addEventListener('click', refreshCreditsUI);
});
