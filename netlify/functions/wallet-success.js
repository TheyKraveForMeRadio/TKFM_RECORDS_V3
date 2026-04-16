import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { user } = event.queryStringParameters;

    await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/add_balance`, {
      method: "POST",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ u: user, amount: 20 })
    });

    return {
      statusCode: 302,
      headers: {
        Location: "/trading.html"
      }
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}
