export async function handler(){

 const derivatives = [

  {

   track:"Hit Song",

   strike_streams:1000000,

   expiry:"2026-12-01"

  }

 ];

 return {

  statusCode:200,

  body:JSON.stringify(derivatives)

 };

}
