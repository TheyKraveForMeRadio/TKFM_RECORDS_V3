import bus from "./_event-bus.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
 process.env.SUPABASE_URL,
 process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const handler = async()=>{

 const potentialArtists = [
  {name:"AI Artist 1"},
  {name:"AI Artist 2"},
  {name:"AI Artist 3"}
 ];

 for(const artist of potentialArtists){

  await supabase
  .from("artists")
  .insert({
   name:artist.name,
   discovered_by:"AI",
   timestamp:new Date().toISOString()
  });

 }

 return{
  statusCode:200,
  body:JSON.stringify({
   status:"artists discovered"
  })
 };

};
