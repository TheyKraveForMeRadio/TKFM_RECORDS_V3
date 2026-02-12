export async function handler(event) {
  const { track, priority } = JSON.parse(event.body);

  const stations = priority === "high"
    ? ["NYC", "ATL", "LA", "CHI"]
    : ["LOCAL-1", "LOCAL-2"];

  return {
    statusCode: 200,
    body: JSON.stringify({
      deployed_to: stations,
      rotation: priority
    })
  };
}
