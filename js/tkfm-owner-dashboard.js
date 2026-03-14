async function fetchDeliverables() {
  const res = await fetch("/.netlify/functions/api/label-studio", {
    method: "POST",
    body: JSON.stringify({ action: "list", artistEmail: TKFM_OWNER_EMAIL })
  });
  const data = await res.json();
  return data;
}

async function markDeliverableDelivered(deliverableId) {
  const res = await fetch("/.netlify/functions/api/label-studio", {
    method: "POST",
    body: JSON.stringify({ action: "update", deliverableId })
  });
  return await res.json();
}

async function createDeliverable(artistEmail) {
  const res = await fetch("/.netlify/functions/api/label-studio", {
    method: "POST",
    body: JSON.stringify({ action: "create", artistEmail })
  });
  return await res.json();
}

window.TKFM_OWNER_DASH = { fetchDeliverables, markDeliverableDelivered, createDeliverable };
