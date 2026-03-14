export async function handler() {
  const base = process.env.SITE_URL + '/.netlify/functions/api/';
  await fetch(base + 'final-os-cron');
  await fetch(base + 'create-franchise');
  await fetch(base + 'ai-dj-engine');
  await fetch(base + 'auto-radio-brain');
  await fetch(base + 'dynamic-pricing');
  return { statusCode: 200, body: 'GLOBAL TKFM CONTROL ACTIVE' };
}
