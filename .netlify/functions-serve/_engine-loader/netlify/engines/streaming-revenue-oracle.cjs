const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async () => {

try {

const { data } = await supabase
.from("streaming_revenue")
.select("*")

const streams = data || []

let revenue = []

streams.forEach(row => {

revenue.push({
catalog_id: row.catalog_id,
spotify: row.spotify_streams,
apple: row.apple_streams,
youtube: row.youtube_views,
revenue: row.revenue
})

})

return {
statusCode:200,
body:JSON.stringify({
engine:"streaming-revenue-oracle",
tracks:revenue.length,
revenue
})
}

} catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}
