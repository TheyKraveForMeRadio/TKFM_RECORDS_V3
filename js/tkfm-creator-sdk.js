window.TKFM = {

 async network(){

  const res = await fetch("/.netlify/functions/api/creator-network-api")

  return res.json()

 },

 async uploadCatalog(data){

  return fetch("/.netlify/functions/api/catalog-mint-engine",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async buyCatalog(data){

  return fetch("/.netlify/functions/api/investor-buy-catalog",{
   method:"POST",
   body:JSON.stringify(data)
  })

 }

}
