export async function getPortfolio(){

  const user = localStorage.getItem("user_id");

  const res = await fetch("/.netlify/functions/engine/get-investor-portfolio?user=" + user);

  return await res.json();

}
