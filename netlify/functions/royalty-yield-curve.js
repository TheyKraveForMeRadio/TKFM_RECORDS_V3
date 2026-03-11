import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

  const { data } = await supabase
  .from("catalogs")
  .select("monthly_revenue, valuation");

  const curve = data.map(c => {

    const annual = c.monthly_revenue * 12;

    const yieldRate = annual / c.valuation;

    return {

      valuation:c.valuation,
      yield:yieldRate

    };

  });

  return {

    statusCode:200,
    body:JSON.stringify({

      yield_curve:curve

    })

  };

}
