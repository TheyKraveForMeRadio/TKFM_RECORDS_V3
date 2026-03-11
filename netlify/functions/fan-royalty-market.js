import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async () => {

const { data } = await supabase
.from("catalogs")
.select("*")

const market = []

for(const c of data || []){

market.push({
catalog:c.title,
artist:c.artist,
price:c.token_price || 1,
yield:c.royalty_yield || "5%"
})

}

return{
statusCode:200,
body:JSON.stringify({
market
})
}

}
