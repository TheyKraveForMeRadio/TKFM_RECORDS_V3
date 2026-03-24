import { buySongNFT } from "./tkfm-buy-engine.js";

window.buyNow = async function(catalog_id, price){

  try{

    const result = await buySongNFT(catalog_id, price);

    alert("Purchase Complete");

    console.log(result);

  }catch(e){
    console.error(e);
    alert("Purchase Failed");
  }

}
