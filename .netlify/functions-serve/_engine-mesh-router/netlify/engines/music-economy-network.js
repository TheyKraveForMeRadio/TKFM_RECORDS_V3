import bus from "./_event-bus.js";
export const handler = async()=>{

const network = {

layers:[
"Artists",
"Catalogs",
"Catalog IPO Markets",
"Fan Investors",
"Trading Exchange",
"Royalty Distribution",
"Licensing Marketplace",
"Music Index Funds",
"Global Music Data Oracle"
]

}

return{
statusCode:200,
body:JSON.stringify(network)
}

}
