export async function handler(){

 const reserves = 5000000;

 return {
  statusCode:200,
  body:JSON.stringify({
   reserve_usd:reserves
  })
 };

}
