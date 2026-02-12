export async function handler(event) {
  const { track, location } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      broadcast: "LIVE",
      track,
      layer: "PHYSICAL + DIGITAL",
      zone: location,
      injected_at: Date.now()
    })
  };
}
