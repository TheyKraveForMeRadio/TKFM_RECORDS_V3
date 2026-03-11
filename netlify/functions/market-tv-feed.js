export async function handler(){

try{

const now=new Date().toLocaleTimeString()

const events=[

{
message:"🔥 Fan bought shares in Midnight Drive",
time:now
},

{
message:"📈 Song price increased 12%",
time:now
},

{
message:"🎧 Artist uploaded a new track",
time:now
},

{
message:"💰 Royalty payout distributed",
time:now
},

{
message:"🏆 Artist entered Top 10 leaderboard",
time:now
}

]

return{
statusCode:200,
body:JSON.stringify({
events
})
}

}catch(err){

return{
statusCode:500,
body:JSON.stringify({
error:err.message
})
}

}

}
