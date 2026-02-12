let sponsorCredits = {}; // simulate DB

exports.handler = async (event) => {
  const { artistEmail, action, amount } = JSON.parse(event.body || "{}");
  if (!artistEmail) return { statusCode: 400, body: "Missing artistEmail" };

  sponsorCredits[artistEmail] = sponsorCredits[artistEmail] || 0;

  if (action === "get") return { statusCode: 200, body: JSON.stringify({ credits: sponsorCredits[artistEmail] }) };
  if (action === "add") sponsorCredits[artistEmail] += Number(amount || 0);
  if (action === "use") {
    if (sponsorCredits[artistEmail] < amount) return { statusCode: 400, body: "Not enough credits" };
    sponsorCredits[artistEmail] -= amount;
  }

  return { statusCode: 200, body: JSON.stringify({ credits: sponsorCredits[artistEmail] }) };
};
