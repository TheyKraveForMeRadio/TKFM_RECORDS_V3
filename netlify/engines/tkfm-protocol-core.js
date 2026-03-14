import bus from "./_event-bus.js";
export const handler = async () => {

return {
statusCode:200,
body:JSON.stringify({
protocol:"TKFM",
version:"1.0",
services:[
"catalog_registry",
"royalty_clearing",
"creator_wallets",
"music_indexes",
"licensing_marketplace"
]
})
}

}
