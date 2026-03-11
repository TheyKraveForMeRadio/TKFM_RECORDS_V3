export async function handler(event) {

  const { message } = JSON.parse(event.body || '{}');

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ text: message })
  });

  return {
    statusCode:200,
    body:JSON.stringify({ sent:true })
  };
}
