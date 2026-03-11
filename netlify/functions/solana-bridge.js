import { Connection } from "@solana/web3.js";

export async function handler(){

 const connection =
 new Connection(
  process.env.SOLANA_RPC
 );

 const slot =
 await connection.getSlot();

 return {

  statusCode:200,

  body:JSON.stringify({

   solana_slot:slot

  })

 };

}
