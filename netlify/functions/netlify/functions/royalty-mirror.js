export async function handler(event) {
  const { artist, track, revenue } = JSON.parse(event.body);

  const split = {
    artist: Math.round(revenue * 0.7),
    label: Math.round(revenue * 0.3)
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      track,
      mirrored: true,
      split
    })
  };
}
