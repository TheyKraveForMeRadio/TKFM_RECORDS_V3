import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

  const { data:catalogs } = await supabase
  .from("catalogs")
  .select("*");

  const valuations = catalogs.map(c => {

    const annualRevenue = c.monthly_revenue * 12;

    const multiple = 8; // typical music catalog multiple

    const value = annualRevenue * multiple;

    return {

      catalog_id:c.id,
      revenue:annualRevenue,
      valuation:value

    };

  });

  return {

    statusCode:200,
    body:JSON.stringify({

      valuations,
      generated:Date.now()

    })

  };

}
