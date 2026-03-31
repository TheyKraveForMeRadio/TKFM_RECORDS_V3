const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  throw new Error("SUPABASE ENV MISSING");
}

// timeout wrapper
function withTimeout(promise, ms = 5000){
  return Promise.race([
    promise,
    new Promise((_, reject)=> setTimeout(()=> reject(new Error("timeout")), ms))
  ]);
}

const client = createClient(url, key);

module.exports = { client, withTimeout };
