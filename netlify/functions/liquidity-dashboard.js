import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(){

 const { data:pools } = await supabase
  .from('liquidity_pools')
  .select('*');

 return {
  statusCode:200,
  body:JSON.stringify(pools)
 };

}
