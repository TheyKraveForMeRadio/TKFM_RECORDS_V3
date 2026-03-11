import fetch from "node-fetch";

export async function handler(){

  const spotify = await fetch(
    "https://api.spotify.com/v1/catalog/streams"
  );

  const data = await spotify.json();

  return {

    statusCode:200,

    body:JSON.stringify({

      streams:data

    })

  };

}
