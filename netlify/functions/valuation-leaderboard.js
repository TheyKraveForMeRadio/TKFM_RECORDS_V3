import fetch from "node-fetch";

export async function handler(){

 const res =
 await fetch(
  process.env.SITE_URL +
  "/.netlify/functions/catalog-live-valuation"
 );

 const data = await res.json();

 const ranked =
 data.sort(
  (a,b)=>b.valuation-a.valuation
 );

 return {

  statusCode:200,

  body:JSON.stringify(
   ranked.slice(0,20)
  )

 };

}
