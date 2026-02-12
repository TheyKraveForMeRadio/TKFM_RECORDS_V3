export async function handler(event) {
  const { city, artistEmail } = JSON.parse(event.body);

  // Example logic: prioritize high-performing cities/artists
  const allocation = {
    ai_drops_25: Math.floor(Math.random() * 3) + 1,
    sponsor_read_20pack: Math.random() > 0.5 ? 1 : 0,
    radio_boost: Math.random() > 0.7
  };

  return {
    statusCode: 200,
    body: JSON.stringify({ city, artistEmail, allocation })
  };
}
