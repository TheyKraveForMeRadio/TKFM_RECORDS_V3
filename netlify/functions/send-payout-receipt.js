import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handler(event) {

  const { email, amount, transferId, batchId } = JSON.parse(event.body);

  if (!email || !amount) {
    return { statusCode: 400, body: "Missing fields" };
  }

  await resend.emails.send({
    from: "payouts@tkfmrecords.com",
    to: email,
    subject: "TKFM Payout Receipt",
    html: `
      <h2>TKFM Records Payout Receipt</h2>
      <p>Amount Paid: <strong>$${amount}</strong></p>
      <p>Stripe Transfer ID: ${transferId}</p>
      <p>Payout Batch: ${batchId}</p>
      <p>Date: ${new Date().toLocaleDateString()}</p>
    `
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
