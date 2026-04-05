export async function buyShares(catalog_id, quantity){

  const token = localStorage.getItem("token");
  const buyer = localStorage.getItem("user_id");

  const res = await fetch("/.netlify/functions/engine/buy-shares", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body:JSON.stringify({
      catalog_id,
      buyer,
      quantity
    })
  });

  const data = await res.json();

  console.log("BUY SHARES:", data);

  return data;
}
