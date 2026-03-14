/*
TKFM Sponsor Read Engine — V3
Handles Unlock Form + Submit Sponsor Read
*/

document.addEventListener('DOMContentLoaded', async () => {
    const unlockBtn = document.getElementById('unlockBtn');
    const formCard = document.getElementById('formCard');
    const submitBtn = document.getElementById('submitBtn');
    const clearBtn = document.getElementById('clearBtn');
    const msgDiv = document.getElementById('msg');
    const creditsElem = document.getElementById('credits');
    
    if(!unlockBtn || !formCard || !submitBtn || !clearBtn || !creditsElem) return;

    // Unlock form by spending 1 credit
    unlockBtn.addEventListener('click', async () => {
        let credits = parseInt(creditsElem.textContent || '0');
        if(credits < 1){
            alert('Not enough credits to unlock form.');
            return;
        }
        try {
            // Call backend to consume 1 credit
            await fetchJSON('/.netlify/functions/api/sponsor-credits-use', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({amount:1})
            });
            // Update UI
            creditsElem.textContent = credits - 1;
            formCard.style.display = 'block';
        } catch(e){
            console.error('Failed to use credit:', e);
            alert('Error using credit. Try refreshing page.');
        }
    });

    // Clear form
    clearBtn.addEventListener('click', () => {
        ['brandName','readLength','cta','pronounce','script','link'].forEach(id=>{
            const el = document.getElementById(id);
            if(el) el.value = '';
        });
        if(msgDiv) msgDiv.style.display = 'none';
    });

    // Submit sponsor read request
    submitBtn.addEventListener('click', async () => {
        const data = {
            brandName: document.getElementById('brandName')?.value.trim(),
            readLength: document.getElementById('readLength')?.value,
            cta: document.getElementById('cta')?.value.trim(),
            pronounce: document.getElementById('pronounce')?.value.trim(),
            script: document.getElementById('script')?.value.trim(),
            link: document.getElementById('link')?.value.trim()
        };

        if(!data.brandName || !data.script){
            alert('Brand name and script are required.');
            return;
        }

        try {
            const res = await fetchJSON('/.netlify/functions/api/sponsor-request-submit', {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(data)
            });
            if(msgDiv){
                msgDiv.style.display='block';
                msgDiv.textContent='Request submitted successfully. Status: '+res.status;
            }
            // Refresh recent requests table
            if(window.loadRecentRequests) await window.loadRecentRequests();
        } catch(e){
            console.error('Failed to submit request:', e);
            if(msgDiv){
                msgDiv.style.display='block';
                msgDiv.textContent='Error submitting request. Try again.';
            }
        }
    });

    // Load recent requests table
    window.loadRecentRequests = async function(){
        const tbody = document.getElementById('reqRows');
        if(!tbody) return;
        try{
            const res = await fetchJSON('/.netlify/functions/api/sponsor-request-list');
            tbody.innerHTML = '';
            res.requests?.forEach(r=>{
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${r.date}</td>
                    <td>${r.brandName}</td>
                    <td>${r.readLength}</td>
                    <td>${r.status}</td>
                    <td class="mono">${r.id}</td>
                `;
                tbody.appendChild(tr);
            });
        } catch(e){
            console.error('Failed to load requests:', e);
        }
    };

    // Initial load
    await window.loadRecentRequests();
});
