export async function sendEmail({ to, subject, html }) {
  try {
    const res = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ to, subject, html })
    });

    const data = await res.json();
    console.log('EMAIL RESPONSE:', data);
    return data;

  } catch (err) {
    console.error('EMAIL ERROR:', err);
  }
}
