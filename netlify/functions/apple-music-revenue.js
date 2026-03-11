import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { artist, track, catalog_id } =
  JSON.parse(event.body)

 const streams = Math.floor(Math.random()*80000)

 const revenue = streams * 0.004

 await supabase
  .from('streaming_revenue_events')
  .insert({
   platform:'apple_music',
   artist_name:artist,
   track_title:track,
   catalog_id,
   streams,
   revenue_usd:revenue
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   platform:'apple_music',
   streams,
   revenue
  })
 }

}
