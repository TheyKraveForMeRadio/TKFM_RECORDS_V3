let NODE_SCORES = {};

export async function handler(event) {
  const { city, action } = JSON.parse(event.body);

  const scoreMap = { play: 1, signup: 3, sponsor: 5 };
  NODE_SCORES[city] = (NODE_SCORES[city] || 0) + (scoreMap[action] || 0);

  return {
    statusCode: 200,
    body: JSON.stringify({
      city,
      score: NODE_SCORES[city],
      tier:
        NODE_SCORES[city] > 50 ? "DOMINANT" :
        NODE_SCORES[city] > 20 ? "GROWING" :
        "SEED"
    })
  };
}
