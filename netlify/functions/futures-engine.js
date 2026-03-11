export async function handler(){

 const futures = [
  {
   catalog:"Drill Catalog",
   strike:50000,
   expiry:"2026-12-31"
  }
 ];

 return {
  statusCode:200,
  body:JSON.stringify(futures)
 };

}
