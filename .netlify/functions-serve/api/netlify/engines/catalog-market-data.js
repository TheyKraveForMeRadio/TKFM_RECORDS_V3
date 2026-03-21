/**
 * catalog-market-data.js
 * CommonJS-friendly engine that dynamically imports @supabase/supabase-js at runtime.
 * Exports:
 *  - module.exports.handler (CommonJS)
 *  - module.exports.default = { handler } (ESM import compatibility)
 */

async function handler(event, context) {
  try {
    // dynamic import so file works regardless of module mode
    let mod;
    try {
      mod = await import('@supabase/supabase-js');
    } catch (impErr) {
      // return helpful error so UI doesn't crash
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          market: [],
          error: "@supabase/supabase-js import failed: " + String(impErr && impErr.message ? impErr.message : impErr)
        }),
      };
    }

    const { createClient } = mod;
    if (!createClient) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          market: [],
          error: "createClient not found on @supabase/supabase-js import"
        }),
      };
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // safe query — returns empty array on any failure
    const { data, error } = await supabase
      .from('catalog_market')
      .select('*')
      .limit(100);

    if (error) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market: [], error: error.message || String(error) })
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ market: data || [] })
    };

  } catch (err) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ market: [], error: String(err && err.message ? err.message : err) })
    };
  }
}

// Export for CommonJS
module.exports.handler = handler;

// Also provide ESM-friendly default export shape in case the gateway does an `import()`
module.exports.default = { handler };
