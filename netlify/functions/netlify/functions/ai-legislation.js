let LAWS = [];

export async function handler(event) {
  const { action, title, rule } = JSON.parse(event.body);

  if (action === "propose") {
    LAWS.push({
      id: LAWS.length,
      title,
      rule,
      active: false,
      created_at: Date.now()
    });
  }

  if (action === "activate") {
    const law = LAWS.find(l => l.id === rule.id);
    if (law) law.active = true;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(LAWS)
  };
}
