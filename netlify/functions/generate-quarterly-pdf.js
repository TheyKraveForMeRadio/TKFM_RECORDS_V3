import PDFDocument from 'pdfkit';
import { supabase } from './supabase.js';
import { handler as reportHandler } from './generate-quarterly-report.js';
import { handler as runwayHandler } from './runway-projection.js';

export async function handler() {

  const report = JSON.parse((await reportHandler()).body);
  const runway = JSON.parse((await runwayHandler()).body);

  const doc = new PDFDocument();

  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));

  doc.fontSize(20).text("TKFM Quarterly Financial Report");
  doc.moveDown();

  doc.text("Revenue: $" + report.revenue);
  doc.text("Payouts: $" + report.payouts);
  doc.text("Escrow Reserve: $" + report.escrow_reserve);
  doc.text("Gross Margin: $" + report.gross_margin);
  doc.text("Net Income: $" + report.net_income);
  doc.moveDown();

  doc.text("Avg Monthly Burn: $" + runway.avg_monthly_burn);
  doc.text("Runway Months: " + runway.runway_months);

  doc.end();

  return new Promise(resolve=>{
    doc.on('end', ()=>{
      const pdfData = Buffer.concat(buffers);
      resolve({
        statusCode:200,
        headers:{
          'Content-Type':'application/pdf'
        },
        body: pdfData.toString('base64'),
        isBase64Encoded:true
      });
    });
  });
}
