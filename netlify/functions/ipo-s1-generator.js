import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler() {

  const subs = await stripe.subscriptions.list({ status:'active', limit:100 });

  const MRR = subs.data.reduce((sum,s)=>
    sum+(s.items.data[0]?.price.unit_amount||0),0)/100;

  const ARR = MRR*12;

  const draft = `
FORM S-1 DRAFT (AUTO-GENERATED)

Company Overview:
TKFM operates a fintech-enabled media infrastructure platform providing treasury,
payout automation, compliance, and SaaS services to record labels and creators.

Revenue Model:
• Recurring SaaS subscriptions
• Embedded payout processing
• Escrow and compliance services
• Treasury management

Financial Highlights:
MRR: $${MRR}
ARR: $${ARR}
Active Subscribers: ${subs.data.length}

Risk Factors:
• Dependency on Stripe API
• Regulatory exposure
• Revenue concentration
• Market volatility

Use of Proceeds:
• Technology expansion
• Regulatory compliance
• International scaling
• Treasury infrastructure

Generated: ${new Date().toISOString()}
`;

  return {
    statusCode:200,
    body:JSON.stringify({ draft })
  };
}
