async function loadOwnerStats() {
  const res = await fetch('/.netlify/functions/owner-stats');
  const data = await res.json();

  document.getElementById('overview').innerHTML = `
    <pre>${JSON.stringify(data.overview, null, 2)}</pre>
  `;

  document.getElementById('artists').innerHTML = `
    <pre>${JSON.stringify(data.artists, null, 2)}</pre>
  `;

  document.getElementById('credits').innerHTML = `
    <pre>${JSON.stringify(data.credits, null, 2)}</pre>
  `;

  document.getElementById('radio').innerHTML = `
    <pre>${JSON.stringify(data.radio, null, 2)}</pre>
  `;
}

loadOwnerStats();
