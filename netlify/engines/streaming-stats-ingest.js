import fetch from "node-fetch"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const handler = async()=>{

 const token = process.env.SPOTIFY_API_TOKEN

 const res = await fetch(
  "https://api.spotify.com/v1/browse/new-releases",
  {
   headers:{
    Authorization:`Bearer ${token}`
   }
  }
 )

 const data = await res.json()

 if(data.albums){

  for(const album of data.albums.items){

   await supabase
    .from("streaming_events")
    .insert({
     platform:"spotify",
     catalog_title:album.name,
     artist:album.artists[0].name,
     created_at:new Date().toISOString()
    })

  }

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"streaming data ingested"
  })
 }

}
