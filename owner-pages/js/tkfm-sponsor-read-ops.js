(async () => {
  const rows = document.getElementById('rows');
  const ownerKey = localStorage.getItem('TKFM_OWNER_KEY');

  async function load() {
    rows.innerHTML = '<tr><td colspan="5">Loading…</td></tr>';
    const res = await fetch('/.netlify/functions/api/sponsor-requests-list',{
      headers:{'x-owner-key':ownerKey}
    });
    const data = await res.json();
    rows.innerHTML = '';

    data.requests.forEach(r=>{
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${r.id}</td>
        <td>${r.email||'—'}</td>
        <td>${r.status}</td>
        <td>
          ${r.audio_url ? `<a href="${r.audio_url}" target="_blank">🎧</a>` : '—'}
        </td>
        <td>
          ${r.status!=='delivered'
            ? `<button onclick="deliver('${r.id}','${r.email}','${r.audio_url}')">Deliver</button>`
<button class="btn ghost" onclick="previewSponsorRead(audioUrl, '/watermark.mp3')">Preview With Watermark</button>
            : '✔ Sent'}
        </td>
      `;
      rows.appendChild(tr);
    });
  }

  window.deliver = async function(id,email,url){
    await fetch('/.netlify/functions/api/sponsor-request-update',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-owner-key':ownerKey
      },
      body:JSON.stringify({id,status:'delivered'})
    });

    await fetch('/.netlify/functions/api/sponsor-send-email',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'x-owner-key':ownerKey
      },
      body:JSON.stringify({
        request_id:id,
        email,
        audio_url:url
      })
    });

    alert("Delivered! Client link copied."); navigator.clipboard.writeText(location.origin+"/sponsor-read-delivery.html?id="+id+"load();audio="+encodeURIComponent(url)); load();
<button class="btn ghost" onclick="previewSponsorRead(audioUrl, '/watermark.mp3')">Preview With Watermark</button>
  };

  alert("Delivered! Client link copied."); navigator.clipboard.writeText(location.origin+"/sponsor-read-delivery.html?id="+id+"load();audio="+encodeURIComponent(url)); load();
<button class="btn ghost" onclick="previewSponsorRead(audioUrl, '/watermark.mp3')">Preview With Watermark</button>
})();
