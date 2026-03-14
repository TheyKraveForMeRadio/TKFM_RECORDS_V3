async function createAIDrop(email, dropPackKey) {
  const res = await fetch("/.netlify/functions/api/ai-drops-engine", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, dropPackKey })
  });
  const data = await res.json();
  return data.url;
}

async function getCredits(email) {
  const res = await fetch("/.netlify/functions/api/ai-drops-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "get" })
  });
  const data = await res.json();
  return data.credits;
}

async function addCredits(email, amount) {
  const res = await fetch("/.netlify/functions/api/ai-drops-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "add", amount })
  });
  const data = await res.json();
  return data.credits;
}

async function useCredits(email, amount) {
  const res = await fetch("/.netlify/functions/api/ai-drops-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "use", amount })
  });
  const data = await res.json();
  return data.credits;
}

window.TKFM_AI_DROPS = { createAIDrop, getCredits, addCredits, useCredits };
