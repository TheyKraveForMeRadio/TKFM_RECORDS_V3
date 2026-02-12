export async function handler() {
  const base = process.env.SITE_URL + '/.netlify/functions/';
  await fetch(base + 'artist-score-engine');
  await fetch(base + 'auto-signing-engine');
  await fetch(base + 'dynamic-pricing');
  await fetch(base + 'auto-promo-engine');
  return { statusCode: 200, body: 'LABEL OS EXECUTED' };
}
