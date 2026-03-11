import { supabase } from './supabase.js';

export async function handler(event) {

  const body = JSON.parse(event.body);

  const {
    email,
    legal_name,
    business_name,
    tax_id,
    address,
    city,
    state,
    zip,
    country,
    signature
  } = body;

  if (!email || !legal_name || !tax_id) {
    return { statusCode: 400, body: "Missing required fields" };
  }

  await supabase.from('artist_tax_profiles')
    .upsert({
      email,
      legal_name,
      business_name,
      tax_id,
      address,
      city,
      state,
      zip,
      country,
      signature,
      submitted_at: new Date(),
      verified: false
    }, { onConflict: 'email' });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
