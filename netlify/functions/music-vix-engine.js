export async function handler(){

 const volatility =
 Math.floor(Math.random()*100);

 return {
  statusCode:200,
  body:JSON.stringify({
   music_vix:volatility
  })
 };

}
