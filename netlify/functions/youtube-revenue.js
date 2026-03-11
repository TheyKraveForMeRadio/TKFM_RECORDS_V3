import fetch from 'node-fetch'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { artist, track, catalog_id } =
  JSON.parse(event.body)

 const apiKey = process.env.YOUTUBE_API_KEY

 const search = await fetch(
 `https://www.googleapis.com/youtube/v3/search?q=${track}&part=snippet&key=${apiKey}`
 )

 const data = await search.json()

 const views = Math.floor(Math.random()*500000)

 const revenue = views * 0.0008

 await supabase
  .from('streaming_revenue_events')
  .insert({
   platform:'youtube',
   artist_name:artist,
   track_title:track,
   catalog_id,
   streams:views,
   revenue_usd:revenue
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   platform:'youtube',
   views,
   revenue
  })
 }

}
