const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ SUPABASE ENV MISSING");
  throw new Error("SUPABASE ENV MISSING");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = { supabase };
