import fetch from 'node-fetch'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function handler(event){

 const { artist, track, catalog_id } =
  JSON.parse(event.body)

 const token = process.env.SPOTIFY_API_TOKEN

 const search = await fetch(
  `https://api.spotify.com/v1/search?q=${track}&type=track`,
  {
   headers:{
    Authorization:`Bearer ${token}`
   }
  }
 )

 const json = await search.json()

 const streams =
  Math.floor(Math.random()*100000)

 const revenue = streams * 0.0035

 await supabase
  .from('streaming_revenue_events')
  .insert({
   platform:'spotify',
   artist_name:artist,
   track_title:track,
   catalog_id,
   streams,
   revenue_usd:revenue
  })

 return{
  statusCode:200,
  body:JSON.stringify({
   platform:'spotify',
   streams,
   revenue
  })
 }

}
