import { supabase } from "./supabase.js";

export async function handler(event) {

  const { spv_name, pool_id } =
    JSON.parse(event.body || "{}");

  await supabase.from("spvs").insert({
    spv_name,
    pool_id,
    created_at:new Date()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      message:"SPV created",
      spv_name
    })
  };
}
