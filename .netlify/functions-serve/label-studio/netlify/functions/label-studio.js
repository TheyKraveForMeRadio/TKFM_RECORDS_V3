// netlify/functions/label-studio.js
var deliverables = {};
var artistCredits = {};
exports.handler = async (event) => {
  try {
    const { action, artistEmail, deliverableId } = JSON.parse(event.body || "{}");
    if (action === "create") {
      const id = Date.now();
      deliverables[id] = { artistEmail, status: "in_progress" };
      artistCredits[artistEmail] = (artistCredits[artistEmail] || 0) + 0;
      return { statusCode: 200, body: JSON.stringify({ id }) };
    }
    if (action === "update") {
      if (!deliverables[deliverableId]) return { statusCode: 400, body: "Invalid ID" };
      deliverables[deliverableId].status = "delivered";
      return { statusCode: 200, body: JSON.stringify({ success: true }) };
    }
    if (action === "list") {
      const list = Object.entries(deliverables).filter(([_, d]) => d.artistEmail === artistEmail).map(([id, d]) => ({ id, ...d }));
      return { statusCode: 200, body: JSON.stringify(list) };
    }
    return { statusCode: 400, body: "Invalid action" };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
};
//# sourceMappingURL=label-studio.js.map
