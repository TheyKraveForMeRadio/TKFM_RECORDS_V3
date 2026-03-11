import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_id, total_value } =
    JSON.parse(event.body || "{}");

  if (!pool_id || !total_value)
    return { statusCode:400, body:"Missing data" };

  const senior = total_value * 0.70;
  const mezz   = total_value * 0.20;
  const equity = total_value * 0.10;

  await supabase.from("tranches").insert([
    { pool_id, name:"Senior", size:senior, priority:1 },
    { pool_id, name:"Mezz", size:mezz, priority:2 },
    { pool_id, name:"Equity", size:equity, priority:3 }
  ]);

  return {
    statusCode:200,
    body:JSON.stringify({
      pool_id,
      structure:{ senior, mezz, equity }
    })
  };
}
