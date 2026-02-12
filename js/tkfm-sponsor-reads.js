async function createSponsorRead(email, readPackKey) {
  const res = await fetch("/.netlify/functions/sponsor-read-engine", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, readPackKey })
  });
  const data = await res.json();
  return data.url;
}

async function getSponsorCredits(email) {
  const res = await fetch("/.netlify/functions/sponsor-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "get" })
  });
  const data = await res.json();
  return data.credits;
}

async function addSponsorCredits(email, amount) {
  const res = await fetch("/.netlify/functions/sponsor-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "add", amount })
  });
  const data = await res.json();
  return data.credits;
}

async function useSponsorCredits(email, amount) {
  const res = await fetch("/.netlify/functions/sponsor-credits", {
    method: "POST",
    body: JSON.stringify({ artistEmail: email, action: "use", amount })
  });
  const data = await res.json();
  return data.credits;
}

window.TKFM_SPONSOR_READS = { createSponsorRead, getSponsorCredits, addSponsorCredits, useSponsorCredits };
