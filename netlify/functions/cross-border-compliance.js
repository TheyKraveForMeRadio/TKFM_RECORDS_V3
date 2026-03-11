import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('slug,country');

  const complianceFlags = [];

  for (const entity of entities || []) {

    let flag = "LOW";

    if (entity.country === "US") flag = "LOW";
    else if (entity.country === "UK") flag = "MEDIUM";
    else flag = "HIGH";

    complianceFlags.push({
      entity:entity.slug,
      country:entity.country,
      riskLevel:flag
    });
  }

  return {
    statusCode:200,
    body:JSON.stringify(complianceFlags)
  };
}
