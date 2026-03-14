async function addCredits(email, creditType, amount) {
  await fetch('/.netlify/functions/api/owner-add-credit', {
    method: 'POST',
    body: JSON.stringify({ email, creditType, amount })
  });
  alert('Credits added');
  location.reload();
}

async function toggleArtist(email, active) {
  await fetch('/.netlify/functions/api/owner-toggle-artist', {
    method: 'POST',
    body: JSON.stringify({ email, active })
  });
  alert('Artist updated');
  location.reload();
}

async function boostRadio(email, trackName) {
  await fetch('/.netlify/functions/api/owner-boost-radio', {
    method: 'POST',
    body: JSON.stringify({ email, trackName })
  });
  alert('Radio boost applied');
}
