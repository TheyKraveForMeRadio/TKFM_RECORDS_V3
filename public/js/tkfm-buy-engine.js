export async function buySongNFT(catalog_id, price){

  const token = localStorage.getItem("token");
  const buyer = localStorage.getItem("user_id");

  const res = await fetch("/.netlify/functions/engine/buy-song-nft", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body:JSON.stringify({
      catalog_id,
      buyer,
      price
    })
  });

  const data = await res.json();

  console.log("BUY RESULT:", data);

  return data;
}
