// netlify/functions/ai-drops-credits.js
var artistCredits = {};
exports.handler = async (event) => {
  const { artistEmail, action, amount } = JSON.parse(event.body || "{}");
  if (!artistEmail) return { statusCode: 400, body: "Missing artistEmail" };
  artistCredits[artistEmail] = artistCredits[artistEmail] || 0;
  if (action === "get") {
    return { statusCode: 200, body: JSON.stringify({ credits: artistCredits[artistEmail] }) };
  }
  if (action === "add") {
    artistCredits[artistEmail] += Number(amount || 0);
  }
  if (action === "use") {
    if (artistCredits[artistEmail] < amount) return { statusCode: 400, body: "Not enough credits" };
    artistCredits[artistEmail] -= amount;
  }
  return { statusCode: 200, body: JSON.stringify({ credits: artistCredits[artistEmail] }) };
};
//# sourceMappingURL=ai-drops-credits.js.map
