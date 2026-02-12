export async function handler() {
  await fetch(process.env.SITE_URL + '/.netlify/functions/label-automation');
  return { statusCode: 200, body: 'nightly automation ran' };
}
