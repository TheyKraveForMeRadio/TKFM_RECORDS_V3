import fetch from "node-fetch";

const BASE = process.env.SUPABASE_URL + "/rest/v1/market";
const KEY = process.env.SUPABASE_ANON_KEY;

export async function handler() {
  try {
    const res = await fetch(BASE, {
      headers: {
        "apikey": KEY,
        "Authorization": `Bearer ${KEY}`
      }
    });

    const data = await res.json();

    for (let t of data) {
      const newPrice = t.price + ((Math.random() - 0.5) * 0.1);

      await fetch(BASE + `?id=eq.${t.id}`, {
        method: "PATCH",
        headers: {
          "apikey": KEY,
          "Authorization": `Bearer ${KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: newPrice })
      });
    }

    return { statusCode: 200, body: "updated" };

  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
}
