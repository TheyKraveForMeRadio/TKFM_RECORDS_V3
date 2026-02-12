let SIGNALS = [];

export async function handler(event) {
  const { artist, track, action } = JSON.parse(event.body);

  const signal = {
    artist,
    track,
    action, // play | drop | sponsor | share
    score: action === "play" ? 1 : action === "share" ? 3 : 2,
    timestamp: Date.now()
  };

  SIGNALS.push(signal);

  return {
    statusCode: 200,
    body: JSON.stringify({
      accepted: true,
      totalSignals: SIGNALS.length
    })
  };
}
