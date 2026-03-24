export async function getUserRevenue(user){

  const res = await fetch("/.netlify/functions/engine/get-user-pnl?user=" + user);

  const data = await res.json();

  return data;

}
