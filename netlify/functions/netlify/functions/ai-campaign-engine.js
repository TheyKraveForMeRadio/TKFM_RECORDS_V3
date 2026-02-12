export async function handler(event) {
  const { streams, genre, region } = JSON.parse(event.body);

  const campaigns = [];

  if (streams > 500)
    campaigns.push("Radio Autopilot Boost");

  if (genre === "hip-hop")
    campaigns.push("AI Drops + Sponsor Reads");

  if (region === "US")
    campaigns.push("Playlist Pitch + Paid Rotation");

  return {
    statusCode: 200,
    body: JSON.stringify({ campaigns })
  };
}
