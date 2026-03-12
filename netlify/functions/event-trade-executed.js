const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

export default async () => {

const event = {
type:"trade_executed",
catalog_id:"song123",
price:12.5,
shares:50
}

await fetch(BASE + "/.netlify/functions/tkfm-event-bus",{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(event)
})

return{
statusCode:200,
body:"trade event emitted"
}

}
