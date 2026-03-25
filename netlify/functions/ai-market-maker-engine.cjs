'use strict';

/**
 * Simple CommonJS fallback for ai-market-maker-engine
 * Exports both module.exports and exports.handler so Netlify loader/require works.
 * Replace the internals with your real market-maker logic as needed.
 */

const { randomInt } = require('crypto');

function genTrade(i = 0) {
  return {
    id: i + 1,
    catalog_id: `song_${randomInt(1,1000)}`,
    price: parseFloat((Math.random() * (1 + Math.random())).toFixed(6)),
    quantity: randomInt(1, 100),
    created_at: new Date().toISOString()
  };
}

async function handler(event, context) {
  // lightweight simulation response so the function can be tested locally
  const trades = Array.from({ length: 6 }).map((_, i) => genTrade(i));
  const payload = {
    engine: 'ai-market-maker-engine',
    ok: true,
    note: 'CommonJS compatibility shim — replace with production logic',
    sample_trades: trades,
    ts: new Date().toISOString()
  };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };
}

// Export for Netlify / require() loaders
module.exports = handler;
exports.handler = handler;
