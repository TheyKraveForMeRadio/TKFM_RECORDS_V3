import fetch from "node-fetch";

export async function handler(event) {
  const { creator_email, amount } = JSON.parse(event.body);

  // add creator earnings
  await fetch(`${process.env.SUPABASE_URL}/rest/v1/referral_stats?user_email=eq.${creator_email}`, {
    method: "PATCH",
    headers: {
      "apikey": process.env.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      rewards: amount
    })
  });

  return {
    statusCode: 200,
    body: "ok"
  };
}
