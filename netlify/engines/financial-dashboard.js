import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

try {

/* -----------------------------
PLATFORM REVENUE
----------------------------- */

const { data: platformFees } = await supabase
.schema("finance")
.from("platform_ledger")
.select("amount")
.eq("entity_type","platform")

const totalRevenue = platformFees?.reduce((sum,x)=>sum+Number(x.amount),0) || 0

/* -----------------------------
ARTIST EARNINGS
----------------------------- */

const { data: artistRevenue } = await supabase
.schema("finance")
.from("platform_ledger")
.select("amount")
.eq("entity_type","artist")

const totalArtist = artistRevenue?.reduce((sum,x)=>sum+Number(x.amount),0) || 0

/* -----------------------------
INVESTOR CASH FLOW
----------------------------- */

const { data: investorFlow } = await supabase
.schema("finance")
.from("platform_ledger")
.select("amount")
.eq("entity_type","investor")

const investorVolume = investorFlow?.reduce((sum,x)=>sum+Number(x.amount),0) || 0

/* -----------------------------
RECENT TRANSACTIONS
----------------------------- */

const { data: recent } = await supabase
.schema("finance")
.from("platform_ledger")
.select("*")
.order("created_at",{ ascending:false })
.limit(25)

return {

statusCode:200,

body: JSON.stringify({

platform_revenue: totalRevenue,
artist_earnings: totalArtist,
investor_volume: investorVolume,
recent_transactions: recent || []

})

}

} catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
