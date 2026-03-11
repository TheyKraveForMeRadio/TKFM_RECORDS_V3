import fetch from "node-fetch"

const jobs = [

"/.netlify/functions/streaming-revenue-oracle",
"/.netlify/functions/spotify-revenue-ingest",
"/.netlify/functions/youtube-revenue-ingest",

"/.netlify/functions/catalog-market-engine",
"/.netlify/functions/matching-engine",

"/.netlify/functions/market-maker-ai",
"/.netlify/functions/market-maker-orders",

"/.netlify/functions/music-index-engine",
"/.netlify/functions/trending-index-engine",

"/.netlify/functions/royalty-distribution-engine",

"/.netlify/functions/creator-growth-engine",
"/.netlify/functions/platform-growth-engine",

"/.netlify/functions/economy-activity-feed"
]

export async function handler(){

for(const job of jobs){

try{

await fetch(process.env.URL + job)

}catch(e){

console.log("job failed",job)

}

}

return {
statusCode:200,
body:"cron complete"
}

}
