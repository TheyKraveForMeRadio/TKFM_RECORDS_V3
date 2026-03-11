import PDFDocument from 'pdfkit';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event) {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });
  const MRR = subs.data.reduce((sum,s)=> sum+(s.items.data[0]?.price.unit_amount||0),0)/100;
  const ARR = MRR*12;

  const doc = new PDFDocument();
  const buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {});

  doc.fontSize(20).text('TKFM Institutional Report');
  doc.moveDown();
  doc.text(`MRR: $${MRR}`);
  doc.text(`ARR: $${ARR}`);
  doc.text(`Active Subs: ${subs.data.length}`);
  doc.text(`Generated: ${new Date().toISOString()}`);

  doc.end();

  const pdf = Buffer.concat(buffers);

  return {
    statusCode:200,
    headers:{
      'Content-Type':'application/pdf',
      'Content-Disposition':'attachment; filename=board-report.pdf'
    },
    body: pdf.toString('base64'),
    isBase64Encoded:true
  };
}
