import PDFDocument from 'pdfkit';
import { supabase } from './supabase.js';

export async function handler(event) {

  const entity_id = event.queryStringParameters?.entity_id;
  if (!entity_id) {
    return { statusCode:400, body:"Entity required" };
  }

  const { data: risk } = await supabase
    .from('entity_risk_scores')
    .select('*')
    .eq('entity_id', entity_id)
    .single();

  const { data: events } = await supabase
    .from('security_events')
    .select('*')
    .eq('actor', entity_id);

  const doc = new PDFDocument();
  const chunks = [];

  doc.on('data', chunk => chunks.push(chunk));

  doc.fontSize(18).text("TKFM Risk Audit Report");
  doc.moveDown();

  doc.fontSize(12).text(`Entity ID: ${entity_id}`);
  doc.text(`Risk Score: ${risk?.risk_score}`);
  doc.text(`Payout Frozen: ${risk?.payout_frozen}`);
  doc.moveDown();

  doc.text("Security Events:");
  events?.forEach(e => {
    doc.text(`${e.created_at} - ${e.event_type}`);
  });

  doc.end();

  await new Promise(resolve => doc.on('end', resolve));

  return {
    statusCode:200,
    headers: {
      "Content-Type":"application/pdf",
      "Content-Disposition":"attachment; filename=risk-audit.pdf"
    },
    body:Buffer.concat(chunks).toString('base64'),
    isBase64Encoded:true
  };
}
