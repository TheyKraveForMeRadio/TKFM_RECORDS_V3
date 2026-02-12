export async function handler(event) {
  const { artist, action } = JSON.parse(event.body);

  const valueMap = {
    play: 0.01,
    sponsor: 5,
    drop: 2,
    share: 0.5
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      artist,
      action,
      value: valueMap[action] || 0,
      recorded_at: Date.now()
    })
  };
}
