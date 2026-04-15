import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email, code } = JSON.parse(event.body);

  const { data } = await supabase
    .from("login_codes")
    .select("*")
    .eq("email", email)
    .eq("code", code)
    .order("created_at", { ascending: false })
    .limit(1);

  if (!data || data.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid code" })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
