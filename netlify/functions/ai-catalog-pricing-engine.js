import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

  const { data:catalogs } = await supabase
  .from("catalogs")
  .select("*");

  const prices = catalogs.map(c => {

    const annualRevenue = c.monthly_revenue * 12;

    const growthFactor = 1 + (c.stream_growth / 100);

    const valuation = annualRevenue * 8 * growthFactor;

    return {

      catalog:c.id,
      revenue:annualRevenue,
      ai_price:valuation

    };

  });

  return {

    statusCode:200,
    body:JSON.stringify({

      prices,
      generated:Date.now()

    })

  };

}
