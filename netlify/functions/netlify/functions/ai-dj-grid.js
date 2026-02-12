let MEMORY = [];

export async function handler(event) {
  const { track, artist, mood } = JSON.parse(event.body);

  MEMORY.push({
    track,
    artist,
    mood,
    timestamp: Date.now()
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      selected_track: track,
      reasoning: "Engagement + Mood Match + Revenue Optimization"
    })
  };
}
