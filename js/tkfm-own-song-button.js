async function ownSong(catalogId){

try{

const status=document.getElementById("own-status")

status.innerText="Processing investment..."

const res=await fetch("/.netlify/functions/own-this-song",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
catalog_id:catalogId,
amount:50
})
})

const data=await res.json()

if(data.success){

status.innerText="You now own shares in this song."

}else{

status.innerText="Transaction failed."

}

}catch(err){

document.getElementById("own-status").innerText="Error processing investment."

}

}
