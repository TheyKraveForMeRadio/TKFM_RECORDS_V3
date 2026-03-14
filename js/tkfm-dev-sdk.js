window.TKFM_DEV = {

 async registerApp(data){

  return fetch("/.netlify/functions/api/creator-apps-registry",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async installApp(data){

  return fetch("/.netlify/functions/api/install-creator-app",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async network(){

  const res = await fetch("/.netlify/functions/api/creator-network-api")

  return res.json()

 }

}
