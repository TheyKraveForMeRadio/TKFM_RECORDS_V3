let NODES = [];

export async function handler(event) {
  const { region } = JSON.parse(event.body);

  const node = {
    id: "TKFM-NODE-" + Date.now(),
    region,
    status: "ACTIVE",
    governance: "AI",
    revenue_share: 0.2,
    created_at: Date.now()
  };

  NODES.push(node);

  return {
    statusCode: 200,
    body: JSON.stringify(node)
  };
}
