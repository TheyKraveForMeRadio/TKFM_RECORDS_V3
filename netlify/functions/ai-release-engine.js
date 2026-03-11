export const handler = async(event)=>{

 const body = JSON.parse(event.body)

 const { artist, track } = body

 return{
  statusCode:200,
  body:JSON.stringify({
   release_created:true,
   artist,
   track
  })
}
}
