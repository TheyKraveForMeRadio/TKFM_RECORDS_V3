import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data:positions } = await supabase
 .from("investor_positions")
 .select("*");

 const payouts = [];

 for(const p of positions){

  const payout = p.monthly_revenue * p.shares;

  payouts.push({

   investor:p.investor_wallet,
   payout

  });

 }

 await supabase
 .from("royalty_payments")
 .insert(payouts);

 return {

  statusCode:200,
  body:JSON.stringify({

   payouts_created:payouts.length

  })

 };

}
