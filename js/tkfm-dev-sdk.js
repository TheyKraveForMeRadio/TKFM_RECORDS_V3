window.TKFM_DEV = {

 async registerApp(data){

  return fetch("/.netlify/functions/creator-apps-registry",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async installApp(data){

  return fetch("/.netlify/functions/install-creator-app",{
   method:"POST",
   body:JSON.stringify(data)
  })

 },

 async network(){

  const res = await fetch("/.netlify/functions/creator-network-api")

  return res.json()

 }

}
