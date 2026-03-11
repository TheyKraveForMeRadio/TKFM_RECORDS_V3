export const handler = async(event) => {

 const body = JSON.parse(event.body)

 const { artist_name } = body

 return {
  statusCode:200,
  body:JSON.stringify({
   signed:true,
   artist:artist_name
  })
}
}
