export async function handler(){

 const listings = [

  {catalog:"Drill Catalog",price:45000},

  {catalog:"Trap Catalog",price:32000}

 ];

 return {

  statusCode:200,

  body:JSON.stringify(listings)

 };

}
