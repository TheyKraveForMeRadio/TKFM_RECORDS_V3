import PDFDocument from 'pdfkit';
import { handler as reportHandler } from './generate-quarterly-report.js';
import { handler as runwayHandler } from './runway-projection.js';
import { supabase } from './supabase.js';

export async function handler() {

  const report = JSON.parse((await reportHandler()).body);
  const runway = JSON.parse((await runwayHandler()).body);

  const { data: artists } = await supabase
    .from('tkfm_artists')
    .select('*');

  const doc = new PDFDocument();
  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(22).text("TKFM Institutional Investor Deck");
  doc.moveDown();

  doc.text("MRR: $" + (report.revenue / 3));
  doc.text("ARR: $" + (report.revenue * 4));
  doc.text("Gross Margin: $" + report.gross_margin);
  doc.text("Net Income: $" + report.net_income);
  doc.text("Burn Rate: $" + runway.avg_monthly_burn);
  doc.text("Runway (Months): " + runway.runway_months);
  doc.text("Total Artists: " + (artists?.length || 0));

  doc.end();

  return new Promise(resolve=>{
    doc.on('end', ()=>{
      const pdfData = Buffer.concat(buffers);
      resolve({
        statusCode:200,
        headers:{'Content-Type':'application/pdf'},
        body: pdfData.toString('base64'),
        isBase64Encoded:true
      });
    });
  });
}
