import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
)

function score(track){

 let score = 0

 if(track.streams) score += track.streams * 0.001
 if(track.tiktok_uses) score += track.tiktok_uses * 0.01
 if(track.youtube_views) score += track.youtube_views * 0.001

 return score

}

export const handler = async()=>{

 const { data:tracks } =
  await supabase
   .from("tracks")
   .select("*")

 const predictions=[]

 for(const track of tracks || []){

  const viral_score = score(track)

  predictions.push({
   track:track.title,
   viral_score
  })

 }

 return{
  statusCode:200,
  body:JSON.stringify(predictions)
 }

}
