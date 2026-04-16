import fetch from "node-fetch";

const BASE = process.env.SUPABASE_URL + "/rest/v1";
const KEY = process.env.SUPABASE_ANON_KEY;

async function db(path, options = {}) {
  return fetch(BASE + path, {
    headers: {
      "apikey": KEY,
      "Authorization": `Bearer ${KEY}`,
      "Content-Type": "application/json"
    },
    ...options
  });
}

export async function handler(event) {
  try {
    const { action, user, track_id } = JSON.parse(event.body);

    // GET PRICE
    const priceRes = await db(`/market?id=eq.${track_id}`);
    const track = (await priceRes.json())[0];
    const price = Number(track.price);

    if (action === "buy") {
      // UPDATE BALANCE
      await db(`/balances?user_id=eq.${user}`, {
        method: "PATCH",
        body: JSON.stringify({ balance: `balance - ${price}` })
      });

      // ADD PORTFOLIO
      await db(`/portfolio`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user,
          track_id,
          shares: 1
        })
      });

    } else if (action === "sell") {
      await db(`/balances?user_id=eq.${user}`, {
        method: "PATCH",
        body: JSON.stringify({ balance: `balance + ${price}` })
      });

      await db(`/portfolio?user_id=eq.${user}&track_id=eq.${track_id}`, {
        method: "PATCH",
        body: JSON.stringify({ shares: 0 })
      });
    }

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
