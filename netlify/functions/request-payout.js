import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { email, amount } = JSON.parse(event.body);

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/payouts`, {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_email: email, amount })
    });

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
