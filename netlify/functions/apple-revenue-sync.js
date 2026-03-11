import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const res = await fetch(
  "https://api.music.apple.com/v1/catalog/us/charts",
  {
   headers:{
    Authorization:"Bearer "+process.env.APPLE_MUSIC_TOKEN
   }
  }
 );

 const data = await res.json();

 for(const song of data.results.songs[0].data){

  await supabase
  .from("streaming_revenue")
  .insert({

   platform:"apple",
   track:song.attributes.name,
   artist:song.attributes.artistName,
   revenue:0.005

  });

 }

 return {
  statusCode:200,
  body:JSON.stringify({synced:true})
 };

}
