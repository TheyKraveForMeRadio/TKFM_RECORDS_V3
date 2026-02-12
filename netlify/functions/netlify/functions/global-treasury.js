export async function handler(event) {
  const { revenue } = JSON.parse(event.body);

  const treasury = {
    reinvestment: revenue * 0.4,
    artists: revenue * 0.4,
    reserve: revenue * 0.15,
    governance: revenue * 0.05
  };

  return {
    statusCode: 200,
    body: JSON.stringify(treasury)
  };
}
