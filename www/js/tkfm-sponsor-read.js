/*
TKFM Sponsor Read Engine JS for V3
Handles wallet display, unlock form, and submission
*/
document.addEventListener('DOMContentLoaded', async ()=>{
    const creditsEl = document.getElementById('credits');
    const custEl = document.getElementById('custId');
    const unlockBtn = document.getElementById('unlockBtn');
    const formCard = document.getElementById('formCard');

    async function refreshCredits(){
        const credits = await getCustomerCredits();
        creditsEl.textContent = credits;
        return credits;
    }

    unlockBtn.addEventListener('click', async ()=>{
        const credits = await getCustomerCredits();
        if(credits<1){ showMessage('Not enough credits', 'warn'); return; }
        await useCredit();
        formCard.style.display = 'block';
        showMessage('Form unlocked! Fill it out and submit.');
        await refreshCredits();
    });

    document.getElementById('refreshBtn').addEventListener('click', refreshCredits);
    await refreshCredits();
});
