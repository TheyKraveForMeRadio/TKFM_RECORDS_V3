/**
 * catalog-price-engine.js
 * CommonJS-friendly engine that dynamically imports @supabase/supabase-js at runtime.
 * Exports:
 *  - module.exports.handler (CommonJS)
 *  - module.exports.default = { handler } (ESM import compatibility)
 *
 * Behavior:
 *  - expects JSON body { catalog_id, price, quantity }
 *  - updates catalog_market (upsert)
 *  - inserts into catalog_trades and catalog_candles
 *  - returns stable JSON (never crashes UI)
 */

async function handler(event, context) {
  try {
    // parse body (support both GET/POST and proxy)
    let body = {};
    if (event.body) {
      try { body = typeof event.body === "string" ? JSON.parse(event.body) : event.body; } catch (e) { body = {}; }
    } else {
      // fallback for some test requests
      body = {};
    }

    const token = body.catalog_id || (event.queryStringParameters && event.queryStringParameters.catalog_id);
    const tradePrice = Number(body.price ?? (event.queryStringParameters && event.queryStringParameters.price));
    const quantity = Number(body.quantity ?? (event.queryStringParameters && event.queryStringParameters.quantity ?? 1));

    if (!token || !tradePrice || isNaN(tradePrice) || isNaN(quantity)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "invalid trade payload. require catalog_id and numeric price (and optional quantity)" }),
      };
    }

    // dynamic import so it works in either CJS or ESM runtimes
    let mod;
    try {
      mod = await import('@supabase/supabase-js');
    } catch (impErr) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "@supabase/supabase-js import failed: " + String(impErr && impErr.message ? impErr.message : impErr) , market: [] })
      };
    }

    const { createClient } = mod;
    if (!createClient) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "createClient not found on @supabase/supabase-js import", market: [] })
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // fetch current market row
    const { data: row, error: fetchErr } = await supabase
      .from('catalog_market')
      .select('*')
      .eq('catalog_id', token)
      .maybeSingle();

    if (fetchErr) {
      // return a safe JSON so front-end doesn't crash
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market: [], error: String(fetchErr.message || fetchErr) })
      };
    }

    // compute new price (volume-weighted simple approach)
    const prevPrice = row && row.price ? Number(row.price) : null;
    const prevVolume = row && row.volume ? Number(row.volume) : 0;

    let newPrice;
    if (prevPrice === null) {
      newPrice = tradePrice;
    } else {
      const totalQty = prevVolume + (quantity || 0);
      if (totalQty <= 0) {
        newPrice = tradePrice;
      } else {
        // weighted average: previous price * prevVolume + tradePrice*quantity / totalQty
        newPrice = ((prevPrice * prevVolume) + (tradePrice * quantity)) / totalQty;
      }
    }

    // sanitize numeric fields
    newPrice = Number(newPrice);
    const newVolume = (prevVolume || 0) + (quantity || 0);
    const marketCap = Number(newPrice) * (row && row.total_shares ? Number(row.total_shares) : 1000000);

    // upsert catalog_market
    const { error: upsertErr } = await supabase
      .from('catalog_market')
      .upsert({
        catalog_id: token,
        price: newPrice,
        volume: newVolume,
        market_cap: marketCap,
        updated_at: new Date().toISOString()
      }, { onConflict: ['catalog_id'] });

    if (upsertErr) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market: [], error: "upsert failed: " + String(upsertErr.message || upsertErr) })
      };
    }

    // insert trade record
    await supabase
      .from('catalog_trades')
      .insert({
        catalog_id: token,
        price: tradePrice,
        quantity: quantity,
        created_at: new Date().toISOString()
      });

    // insert a simple candle (open/high/low/close == price) — front-end can aggregate
    await supabase
      .from('catalog_candles')
      .insert({
        catalog_id: token,
        open: newPrice,
        high: newPrice,
        low: newPrice,
        close: newPrice,
        timestamp: new Date().toISOString()
      });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "price updated",
        catalog_id: token,
        price: newPrice,
        volume: newVolume,
        market_cap: marketCap
      })
    };

  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ market: [], error: String(err && err.message ? err.message : err) })
    };
  }
}

// CommonJS export
module.exports.handler = handler;
// ESM-friendly shape for import()
module.exports.default = { handler };
