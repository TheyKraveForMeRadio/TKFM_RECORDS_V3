import { supabase } from './supabase.js';

export async function handler() {

  const { data: audits } = await supabase.from('audit_logs').select('*');
  const { data: security } = await supabase.from('security_events').select('*');
  const { data: approvals } = await supabase.from('approval_requests').select('*');

  return {
    statusCode:200,
    body:JSON.stringify({
      audit_logs: audits,
      security_events: security,
      approval_requests: approvals
    })
  };
}
