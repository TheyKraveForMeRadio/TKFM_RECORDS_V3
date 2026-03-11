import crypto from 'crypto';
import { supabase } from './supabase.js';

export async function handler() {

  const maxAgeDays = 90;
  const now = new Date();

  const secrets = [
    { name: "STRIPE_SECRET_KEY", value: process.env.STRIPE_SECRET_KEY },
    { name: "TKFM_JWT_SECRET", value: process.env.TKFM_JWT_SECRET }
  ];

  const results = [];

  for (const secret of secrets) {

    const hash = crypto.createHash('sha256')
      .update(secret.value || '')
      .digest('hex');

    const { data } = await supabase
      .from('secret_rotation_log')
      .select('*')
      .eq('secret_name', secret.name)
      .single();

    if (!data) {
      await supabase.from('secret_rotation_log').insert({
        secret_name: secret.name,
        secret_hash: hash,
        rotated_at: now
      });

      results.push({
        secret: secret.name,
        status: "Initialized"
      });

      continue;
    }

    const rotatedAt = new Date(data.rotated_at);
    const ageDays = (now - rotatedAt) / (1000 * 60 * 60 * 24);

    results.push({
      secret: secret.name,
      age_days: ageDays,
      compliant: ageDays <= maxAgeDays
    });

  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      soc2_secret_rotation_check: results
    })
  };
}
