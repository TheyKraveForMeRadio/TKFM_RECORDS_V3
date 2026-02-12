export async function handler(event) {
  const { track, artist, revenue } = JSON.parse(event.body);

  const tokensMinted = Math.floor(revenue / 5);

  return {
    statusCode: 200,
    body: JSON.stringify({
      track,
      artist,
      tokensMinted,
      standard: "ERC1155",
      mirror: true
    })
  };
}
