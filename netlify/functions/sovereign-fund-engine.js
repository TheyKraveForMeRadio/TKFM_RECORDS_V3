export async function handler(){

 const funds = [

  {fund:"Global Music Fund",assets:50000000},

  {fund:"HipHop Royalty Fund",assets:12000000}

 ];

 return {

  statusCode:200,

  body:JSON.stringify(funds)

 };

}
