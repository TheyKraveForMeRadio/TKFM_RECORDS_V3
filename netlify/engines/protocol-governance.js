import bus from "./_event-bus.js";
export const handler = async(event)=>{

const body = JSON.parse(event.body)

return{
statusCode:200,
body:JSON.stringify({
proposal:body.proposal,
status:"vote recorded"
})
}

}
