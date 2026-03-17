
/*
TKFM STREAMING REVENUE ORACLE

Converts streaming activity into financial signals
for the TKFM music asset market.
*/

const { createClient } = require("@supabase/supabase-js")

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
)

exports.handler = async function(){

try{

/*
Fetch latest streaming stats
*/

const { data:streams } = await supabase
.from("streaming_stats")
.select("*")
.order("timestamp",{ascending:false})
.limit(500)

const signals = {}

streams.forEach(s=>{

const revenue =
(s.spotify_streams || 0) * 0.003 +
(s.youtube_views || 0) * 0.001 +
(s.apple_streams || 0) * 0.005

if(!signals[s.catalog_id]){

signals[s.catalog_id] = {
catalog_id:s.catalog_id,
streams:0,
revenue:0
}

}

signals[s.catalog_id].streams +=
(s.spotify_streams || 0) +
(s.youtube_views || 0) +
(s.apple_streams || 0)

signals[s.catalog_id].revenue += revenue

})

/*
Convert revenue into market price signals
*/

const pricing = Object.values(signals).map(a=>{

const price_signal =
a.revenue * 10

return {
catalog_id:a.catalog_id,
streams:a.streams,
revenue:a.revenue,
price_signal
}

})

return {

statusCode:200,

body:JSON.stringify({

engine:"streaming-revenue-oracle",

assets:pricing

})

}

}catch(err){

return {
statusCode:500,
body:JSON.stringify({error:err.message})
}

}

}

