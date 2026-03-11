export async function handler(){

 const supply = 2500000;

 return {
  statusCode:200,
  body:JSON.stringify({
   musd_supply:supply
  })
 };

}
