/*
TKFM MASTER AUTOLOADER
Loads all frontend modules dynamically
Prevents 40+ script tags across pages
*/

(function(){

const modules = [

"tkfm-shell.js",
"tkfm-network.js",
"tkfm-functions-client.js",
"tkfm-wallet.js",
"tkfm-song-router.js",
"tkfm-financial-api.js",
"tkfm-checkout.js",
"tkfm-buy-credits.js",
"tkfm-own-song-button.js",
"tkfm-radio-rotation-engine.js",
"tkfm-radio-rotation.js",
"tkfm-royalties.js",
"tkfm-royalty-engine.js",
"tkfm-token-network.js",
"tkfm-ai-engines.js",
"tkfm-ai-drops.js",
"tkfm-ai-dashboard.js",
"tkfm-label-gate.js",
"tkfm-owner-nav.js"

]

function loadScript(src){

return new Promise((resolve,reject)=>{

const s=document.createElement("script")

s.src="/js/"+src

s.onload=resolve
s.onerror=reject

document.head.appendChild(s)

})

}

async function boot(){

for(const m of modules){

try{

await loadScript(m)

console.log("TKFM module loaded:",m)

}catch(err){

console.error("Module failed:",m)

}

}

console.log("TKFM OS READY")

}

boot()

})()
