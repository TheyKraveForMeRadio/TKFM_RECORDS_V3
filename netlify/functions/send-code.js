import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function handler(event) {
  const { email } = JSON.parse(event.body);

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await supabase.from("login_codes").insert({
    email,
    code
  });

  await resend.emails.send({
    from: "TKFM <onboarding@resend.dev>",
    to: email,
    subject: "Your TKFM Code",
    html: `<h2>Your login code: ${code}</h2>`
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
}
