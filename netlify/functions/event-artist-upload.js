const BASE = process.env.SELF_BASE_URL || "https://tkfmrecords.com"

export default async () => {

const event = {
type:"song_uploaded",
catalog_id:"songABC",
artist:"DJ KRAVE"
}

await fetch(BASE + "/.netlify/functions/tkfm-event-bus",{
method:"POST",
headers:{ "content-type":"application/json" },
body:JSON.stringify(event)
})

return{
statusCode:200,
body:"upload event emitted"
}

}
