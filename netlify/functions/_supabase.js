import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;

// support BOTH naming styles so nothing breaks
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY;

// hard fail with clear logs
if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ SUPABASE ENV DEBUG:");
  console.error("SUPABASE_URL:", SUPABASE_URL);
  console.error("SUPABASE_SERVICE_ROLE_KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "FOUND" : "MISSING");
  console.error("SUPABASE_SERVICE_KEY:", process.env.SUPABASE_SERVICE_KEY ? "FOUND" : "MISSING");

  throw new Error("SUPABASE ENV MISSING");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
