import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const { data } = await supabase
 .from("royalty_streams")
 .select("*");

 const payouts = data.map(r => {

  const revenue = r.streams * 0.004;

  return {

   artist:r.artist,
   payout:revenue

  };

 });

 return {

  statusCode:200,
  body:JSON.stringify({payouts})

 };

}
