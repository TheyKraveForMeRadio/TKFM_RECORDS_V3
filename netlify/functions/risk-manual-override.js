import { supabase } from './supabase.js';
import jwt from 'jsonwebtoken';

export async function handler(event) {

  const token =
    event.headers.authorization?.replace('Bearer ','');
  if (!token) return { statusCode:401, body:"Unauthorized" };

  try {
    jwt.verify(token, process.env.TKFM_JWT_SECRET);
  } catch {
    return { statusCode:401, body:"Invalid token" };
  }

  const { entity_id, action } =
    JSON.parse(event.body || '{}');

  if (!entity_id || !action)
    return { statusCode:400, body:"Invalid request" };

  if (action === 'freeze') {

    await supabase.from('entity_risk_scores')
      .update({
        freeze_active:true,
        freeze_triggered_at:new Date().toISOString()
      })
      .eq('entity_id', entity_id);

  }

  if (action === 'unfreeze') {

    await supabase.from('entity_risk_scores')
      .update({
        freeze_active:false,
        freeze_triggered_at:null
      })
      .eq('entity_id', entity_id);

  }

  if (action === 'reset') {

    await supabase.from('entity_risk_scores')
      .update({
        risk_score:0,
        freeze_active:false,
        freeze_triggered_at:null
      })
      .eq('entity_id', entity_id);

  }

  return {
    statusCode:200,
    body:JSON.stringify({ success:true })
  };
}
