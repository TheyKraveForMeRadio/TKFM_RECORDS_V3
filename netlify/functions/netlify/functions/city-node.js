let CITY_NODES = {};

export async function handler(event) {
  const { city, founder } = JSON.parse(event.body);

  if (!CITY_NODES[city]) {
    CITY_NODES[city] = {
      founder,
      artists: [],
      created_at: Date.now()
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      city,
      founder,
      status: "ACTIVE_NODE"
    })
  };
}
