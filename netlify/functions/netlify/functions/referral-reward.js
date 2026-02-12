export async function handler(event) {
  const { referrer } = JSON.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify({
      referrer,
      creditsAdded: {
        ai_drops_25: 1,
        sponsor_read_20pack: 0.2
      },
      boosted: true,
      issued_at: Date.now()
    })
  };
}
