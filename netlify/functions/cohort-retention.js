import { supabase } from './supabase.js';

export async function handler() {

  const { data: entities } = await supabase
    .from('entities')
    .select('created_at, last_active_at');

  const cohorts = {};

  (entities||[]).forEach(e => {

    const cohort =
      new Date(e.created_at).toISOString().slice(0,7);

    if(!cohorts[cohort]) cohorts[cohort] = { total:0, active:0 };

    cohorts[cohort].total++;

    const daysInactive =
      (Date.now() - new Date(e.last_active_at))/86400000;

    if(daysInactive < 30)
      cohorts[cohort].active++;
  });

  return {
    statusCode:200,
    body:JSON.stringify(cohorts)
  };
}
