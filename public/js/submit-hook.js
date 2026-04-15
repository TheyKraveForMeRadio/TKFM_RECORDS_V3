import { sendEmail } from './send-email.js';

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('#artistForm');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const artistName = document.querySelector('#artistName').value;
    const email = document.querySelector('#email').value;
    const trackTitle = document.querySelector('#trackTitle').value;

    try {
      // 🔥 MAIN BACKEND PIPELINE (stores + triggers logic)
      await fetch('/.netlify/functions/submit-artist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          artistName,
          email,
          trackTitle
        })
      });

      // 🔥 EMAIL TO OWNER
      await sendEmail({
        to: ['tkfmrecords@gmail.com'],
        subject: '🚨 New TKFM Submission',
        html: `
          <h2>New Artist Submission</h2>
          <p><b>Artist:</b> ${artistName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Track:</b> ${trackTitle}</p>
        `
      });

      // 🔥 EMAIL TO ARTIST
      await sendEmail({
        to: [email],
        subject: '🎧 TKFM Submission Received',
        html: `
          <h1>🔥 You’re Locked In</h1>
          <p>Artist: ${artistName}</p>
          <p>Track: ${trackTitle}</p>
          <p>We’ll review and contact you soon.</p>
        `
      });

      alert('Submission sent ✅');

      form.reset();

    } catch (err) {
      console.error(err);
      alert('Submission failed ❌');
    }

  });

});
