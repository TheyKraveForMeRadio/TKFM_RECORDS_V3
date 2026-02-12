export async function handler(event) {
  const { track, tier } = JSON.parse(event.body);

  const mesh = tier === "global"
    ? ["US", "EU", "LATAM", "AFRICA", "ASIA"]
    : ["LOCAL"];

  return {
    statusCode: 200,
    body: JSON.stringify({
      track,
      broadcastZones: mesh,
      synced: true
    })
  };
}
