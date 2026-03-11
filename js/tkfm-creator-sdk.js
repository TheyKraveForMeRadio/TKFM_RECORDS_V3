window.TKFM = {

 async network(){

  const res = await fetch("/.netlify/functions/creator-network-api")

  return res.json()

 },

 async uploadCatalog(data){

  return fetch("/.netlify/functions/catalog-mint-engine",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async buyCatalog(data){

  return fetch("/.netlify/functions/investor-buy-catalog",{
   method:"POST",
   body:JSON.stringify(data)
  })

 }

}
