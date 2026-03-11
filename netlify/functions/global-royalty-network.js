export async function handler(){

 return {

  statusCode:200,

  body:JSON.stringify({

   global_settlement:"active",

   regions:["US","EU","Asia"]

  })

 };

}
