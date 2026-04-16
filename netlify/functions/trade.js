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

    const trackRes = await db(`/market?id=eq.${track_id}`);
    const track = (await trackRes.json())[0];

    const price = Number(track.price);

    // GET USER BALANCE
    const balRes = await db(`/balances?user_id=eq.${user}`);
    const balance = (await balRes.json())[0].balance;

    if (action === "buy") {
      if (balance < price) throw new Error("Insufficient funds");

      // deduct balance
      await db(`/balances?user_id=eq.${user}`, {
        method: "PATCH",
        body: JSON.stringify({
          balance: balance - price
        })
      });

      // add portfolio
      await db(`/portfolio`, {
        method: "POST",
        body: JSON.stringify({
          user_id: user,
          track_id,
          shares: 1
        })
      });

    } else if (action === "sell") {

      // add balance
      await db(`/balances?user_id=eq.${user}`, {
        method: "PATCH",
        body: JSON.stringify({
          balance: balance + price
        })
      });

      // reduce shares
      await db(`/portfolio?user_id=eq.${user}&track_id=eq.${track_id}`, {
        method: "DELETE"
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
