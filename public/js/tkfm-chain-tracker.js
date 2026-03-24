export async function getTokenTx(token_id){

  const res = await fetch("/.netlify/functions/engine/get-token-tx?token_id=" + token_id);

  const data = await res.json();

  return data;

}
