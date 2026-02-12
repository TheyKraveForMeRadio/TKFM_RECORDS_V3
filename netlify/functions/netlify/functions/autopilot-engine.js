let TRACK_SCORES = {};

export async function handler(event) {
  const { track, score } = JSON.parse(event.body);

  TRACK_SCORES[track] = (TRACK_SCORES[track] || 0) + score;

  const promote = TRACK_SCORES[track] >= 10;

  return {
    statusCode: 200,
    body: JSON.stringify({
      track,
      totalScore: TRACK_SCORES[track],
      promote
    })
  };
}
