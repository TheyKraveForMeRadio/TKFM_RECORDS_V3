import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE
);

export async function handler(){

 const res = await fetch(
  "https://www.googleapis.com/youtube/v3/videos",
  {
   headers:{
    Authorization:"Bearer "+process.env.YOUTUBE_TOKEN
   }
  }
 );

 const data = await res.json();

 for(const video of data.items){

  await supabase
  .from("streaming_revenue")
  .insert({

   platform:"youtube",
   track:video.snippet.title,
   artist:video.snippet.channelTitle,
   revenue:0.003

  });

 }

 return {
  statusCode:200,
  body:JSON.stringify({synced:true})
 };

}
