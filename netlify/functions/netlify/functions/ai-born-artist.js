let ARTISTS = [];

export async function handler(event) {
  const { genre, persona } = JSON.parse(event.body);

  const artist = {
    id: "AI-ART-" + Date.now(),
    name: persona || "TKFM_ENTITY_" + Math.floor(Math.random()*9999),
    genre,
    origin: "SYNTHETIC",
    rights_holder: "TKFM",
    status: "SIGNED",
    created_at: Date.now()
  };

  ARTISTS.push(artist);

  return {
    statusCode: 200,
    body: JSON.stringify(artist)
  };
}
