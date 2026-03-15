/**
 * Order Book Engine — lightweight, no external SDKs.
 * Uses Supabase REST API via global fetch to avoid @supabase dependency.
 *
 * Expects env:
 *  SUPABASE_URL (e.g. https://xyz.supabase.co)
 *  SUPABASE_SERVICE_ROLE_KEY (service_role key)
 *
 * Query param: ?catalog_id=song123
 */

exports.handler = async function(event) {
  try {
    const catalog_id = (event?.queryStringParameters?.catalog_id) || "song123";

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env" })
      };
    }

    // Build Supabase REST query for recent trades for the catalog_id
    const table = "catalog_trades";
    const params = new URLSearchParams({
      select: "price,quantity",
      // order param for supabase REST: order=price.desc
      order: "price.desc",
      limit: "50"
    });
    // Add filter for catalog_id using eq
    // supabase REST filter syntax: catalog_id=eq.value
    // append manually so we can encode catalog_id safely
    const filterPart = `catalog_id=eq.${encodeURIComponent(catalog_id)}`;
    const url = `${SUPABASE_URL.replace(/\/$/, "")}/rest/v1/${table}?${filterPart}&${params.toString()}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`
      }
    });

    if (!res.ok) {
      const text = await res.text().catch(()=>null);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: "supabase REST error", status: res.status, body: text })
      };
    }

    const data = await res.json();

    // Build a simple orderbook: split fetched trades randomly into bids/asks
    const bids = [];
    const asks = [];

    for (const t of data) {
      const trade = { price: Number(t.price), quantity: Number(t.quantity) || 1 };
      (Math.random() > 0.5 ? bids : asks).push(trade);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        catalog_id,
        engine: "order-book-engine",
        orderbook: {
          bids,
          asks
        },
        fetched: data.length
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
