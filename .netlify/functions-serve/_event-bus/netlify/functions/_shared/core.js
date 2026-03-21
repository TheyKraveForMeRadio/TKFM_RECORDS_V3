import { createClient } from "@supabase/supabase-js"
import Redis from "ioredis"
import Stripe from "stripe"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const redis = new Redis(process.env.REDIS_URL)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export {
  supabase,
  redis,
  stripe
}
