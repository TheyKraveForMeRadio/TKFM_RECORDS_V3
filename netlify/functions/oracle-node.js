import fetch from "node-fetch";

export async function handler(){

 const spotify = await fetch(
  "https://api.spotify.com/v1/catalog/streams"
 );

 const apple = await fetch(
  "https://api.music.apple.com/v1/catalog/streams"
 );

 const spotifyData = await spotify.json();
 const appleData = await apple.json();

 return {

  statusCode:200,
  body:JSON.stringify({

   spotify:spotifyData,
   apple:appleData

  })

 };

}
