export async function handler(event) {
  const { streams, saves, spins, followers } = JSON.parse(event.body);

  const score = streams*0.4 + saves*1.2 + spins*2 + followers*0.05;
  const projectedMonthly = Math.round(score * 0.18);

  return {
    statusCode: 200,
    body: JSON.stringify({
      score,
      projectedMonthlyUSD: projectedMonthly,
      recommendation: projectedMonthly > 200
        ? "AUTO-BOOST + FEATURED RAIL"
        : "NORMAL ROTATION"
    })
  };
}
