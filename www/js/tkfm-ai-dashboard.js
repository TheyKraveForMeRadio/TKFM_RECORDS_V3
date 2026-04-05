async function renderLabelAI() {
  const div = document.getElementById("labelAIStats");
  const tracks = await TKFM_DISTRIBUTION.listTracks(window.TKFM_EMAIL);
  const predictions = [];

  for (const t of tracks) {
    const res = await fetch('/.netlify/functions/api/predict-hit', {
      method: 'POST',
      body: JSON.stringify({ trackName: t.trackName, artistEmail: window.TKFM_EMAIL })
    });
    predictions.push(await res.json());
  }

  div.innerHTML = `<pre>${JSON.stringify(predictions, null, 2)}</pre>`;
}
renderLabelAI();
