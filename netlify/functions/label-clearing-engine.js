export async function handler(){

 const settlements = [
  {from:"Label A",to:"Label B",amount:5000},
  {from:"Label C",to:"Label A",amount:1200}
 ];

 return {
  statusCode:200,
  body:JSON.stringify(settlements)
 };

}
