export async function handler(){

 const bids = [
  {price:10,amount:100},
  {price:9,amount:200}
 ];

 const asks = [
  {price:11,amount:150}
 ];

 return {
  statusCode:200,
  body:JSON.stringify({bids,asks})
 };

}
