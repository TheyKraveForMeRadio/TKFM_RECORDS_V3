export async function handler(){

try{

const orders=[

{side:"BUY",price:1.05},
{side:"BUY",price:1.03},
{side:"BUY",price:1.01},

{side:"SELL",price:1.10},
{side:"SELL",price:1.12},
{side:"SELL",price:1.15}

]

return{
statusCode:200,
body:JSON.stringify({
orders
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
