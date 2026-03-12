const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

export default async () => {

const event = {
type:"royalty_generated",
catalog_id:"song123",
amount:350
}

await fetch(BASE + "/.netlify/functions/tkfm-event-bus",{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(event)
})

return{
statusCode:200,
body:"royalty event emitted"
}

}
