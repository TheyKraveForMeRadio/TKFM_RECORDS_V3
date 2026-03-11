import { supabase } from './supabase.js';

export async function handler() {

  const { data: risks } = await supabase
    .from('entity_risk_scores')
    .select('*');

  const frozen = risks.filter(r=>r.freeze_active).length;
  const avgRisk =
    risks.reduce((a,b)=>a+(b.risk_score||0),0) /
    (risks.length || 1);

  const highRisk =
    risks.filter(r=>r.risk_score >= 60);

  const buckets = {
    low: risks.filter(r=>r.risk_score < 30).length,
    medium: risks.filter(r=>r.risk_score >=30 && r.risk_score<70).length,
    high: risks.filter(r=>r.risk_score >=70).length
  };

  return {
    statusCode:200,
    body:JSON.stringify({
      total_entities: risks.length,
      frozen_entities: frozen,
      average_risk: avgRisk,
      buckets,
      highRiskEntities: highRisk
    })
  };
}
