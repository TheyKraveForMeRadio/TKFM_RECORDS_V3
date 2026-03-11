import crypto from "crypto";
import { supabase } from "./supabase.js";

export async function handler(event) {

  const { pool_id } =
    JSON.parse(event.body || "{}");

  const { data } = await supabase
    .from("tranches")
    .select("*")
    .eq("pool_id", pool_id);

  const hash = crypto
    .createHash("sha256")
    .update(JSON.stringify(data))
    .digest("hex");

  await supabase.from("pool_hashes").insert({
    pool_id,
    hash,
    created_at:new Date()
  });

  return {
    statusCode:200,
    body:JSON.stringify({
      pool_id,
      hash
    })
  };
}
