let PROPOSALS = [];

export async function handler(event) {
  const { action, title, vote } = JSON.parse(event.body);

  if (action === "propose") {
    PROPOSALS.push({
      id: PROPOSALS.length,
      title,
      yes: 0,
      no: 0,
      open: true
    });
  }

  if (action === "vote") {
    const p = PROPOSALS.find(p => p.id === vote.id);
    if (!p || !p.open) return { statusCode: 400, body: "CLOSED" };
    vote.choice === "yes" ? p.yes++ : p.no++;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(PROPOSALS)
  };
}
