import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { user, amount } = JSON.parse(event.body);

    // deduct balance
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/balances?user_id=eq.${user}`, {
      method: "PATCH",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        balance: `balance - ${amount}`
      })
    });

    // (hook into Stripe payout or your payout system later)

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
