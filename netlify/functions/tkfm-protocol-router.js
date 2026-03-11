export const handler = async(event)=>{

 const path = event.path

 if(path.includes("catalog"))
  return{
   statusCode:200,
   body:JSON.stringify({route:"catalog"})
  }

 if(path.includes("artist"))
  return{
   statusCode:200,
   body:JSON.stringify({route:"artist"})
  }

 if(path.includes("royalty"))
  return{
   statusCode:200,
   body:JSON.stringify({route:"royalty"})
  }

 return{
  statusCode:404,
  body:"unknown route"
 }

}
