export async function uploadRoyaltyReport(data){

  const token = localStorage.getItem("token");

  const res = await fetch("/.netlify/functions/engine/royalty-ingest",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body:JSON.stringify(data)
  });

  return await res.json();

}
