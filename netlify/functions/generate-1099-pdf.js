import { supabase } from './supabase.js';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function handler(event) {

  const { email, year } = event.queryStringParameters;

  const { data: payouts } = await supabase
    .from('payout_line_items')
    .select('*')
    .eq('artist_email', email)
    .gte('created_at', `${year}-01-01`)
    .lte('created_at', `${year}-12-31`);

  let total = 0;
  for (const p of payouts || []) total += Number(p.amount);

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  page.drawText(`Form 1099-NEC`, { x: 200, y: 750, size: 18 });
  page.drawText(`Recipient: ${email}`, { x: 50, y: 700, size: 12 });
  page.drawText(`Year: ${year}`, { x: 50, y: 680, size: 12 });
  page.drawText(`Total Nonemployee Compensation: $${total}`, { x: 50, y: 650, size: 12 });

  const pdfBytes = await pdfDoc.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="1099_${email}_${year}.pdf"`
    },
    body: Buffer.from(pdfBytes).toString('base64'),
    isBase64Encoded: true
  };
}
