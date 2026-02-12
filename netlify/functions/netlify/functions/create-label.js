import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { label_name, owner_email } = JSON.parse(event.body);

  await supabase.from('tkfm_labels').insert({
    label_name,
    owner_email,
    status: 'active'
  });

  return { statusCode: 200, body: 'LABEL CREATED' };
}
