import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const token = process.env.SPOTIFY_API_TOKEN;

 const res = await fetch(
  "https://api.spotify.com/v1/me/player/recently-played",
  {
   headers:{
    Authorization:"Bearer " + token
   }
  }
 );

 const data = await res.json();

 for(const item of data.items){

  await supabase
  .from("streaming_events")
  .insert({

   platform:"spotify",
   track:item.track.name,
   artist:item.track.artists[0].name,
   played_at:item.played_at

  });

 }

 return {

  statusCode:200,
  body:JSON.stringify({ingested:true})

 };

}
