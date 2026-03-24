export async function linkStreaming(catalog_id, spotify_id, apple_id){

  const token = localStorage.getItem("token");

  const res = await fetch("/.netlify/functions/engine/register-streaming-ids",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body:JSON.stringify({
      catalog_id,
      spotify_id,
      apple_id
    })
  });

  return await res.json();

}
