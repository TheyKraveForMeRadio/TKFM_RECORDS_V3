import { createClient } from "@supabase/supabase-js";
import { cacheGet, cacheSet } from "./redis-cache.js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler() {

  const cacheKey = "market_data";

  const cached = await cacheGet(cacheKey);
  if (cached) {
    return {
      statusCode: 200,
      body: JSON.stringify(cached)
    };
  }

  const { data } = await supabase
    .from("catalogs")
    .select("*")
    .order("market_cap", { ascending: false })
    .limit(50);

  const response = { market: data || [] };

  await cacheSet(cacheKey, response, 10);

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  };
}
