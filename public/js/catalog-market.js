
let chart;

async function loadTrending(){

 const res = await fetch('/.netlify/functions/liquidity-dashboard');

 const pools = await res.json();

 const div = document.getElementById("catalogList");

 div.innerHTML = pools.map(p=>`

 <div class="card">

 <b>Token:</b> ${p.token_id}<br>

 Token Reserve: ${p.token_reserve}<br>

 USD Reserve: ${p.usd_reserve}

 <br><br>

 <button onclick="loadChart('${p.token_id}')">
 View Chart
 </button>

 </div>

 `).join('');

}

async function loadChart(token){

 const res = await fetch(
  '/.netlify/functions/price-discovery?token_id='+token
 );

 const data = await res.json();

 const ctx = document.getElementById('priceChart');

 if(chart){
  chart.destroy();
 }

 chart = new Chart(ctx,{
  type:'line',
  data:{
   labels:['Price'],
   datasets:[{
    label:'Catalog Token Price',
    data:[data.price],
   }]
  }
 });

}

async function buy(){

 const token_id = document.getElementById("tokenInput").value;
 const price = document.getElementById("priceInput").value;
 const quantity = document.getElementById("quantityInput").value;

 await fetch('/.netlify/functions/orderbook-engine',{
  method:'POST',
  body:JSON.stringify({
   token_id,
   side:'BUY',
   price,
   quantity,
   investor_email:'investor@test.com'
  })
 });

 alert("BUY order submitted");

}

async function sell(){

 const token_id = document.getElementById("tokenInput").value;
 const price = document.getElementById("priceInput").value;
 const quantity = document.getElementById("quantityInput").value;

 await fetch('/.netlify/functions/orderbook-engine',{
  method:'POST',
  body:JSON.stringify({
   token_id,
   side:'SELL',
   price,
   quantity,
   investor_email:'investor@test.com'
  })
 });

 alert("SELL order submitted");

}

async function loadLiquidity(){

 const res = await fetch('/.netlify/functions/liquidity-dashboard');

 const data = await res.json();

 document.getElementById("liquidityStats").textContent =
  JSON.stringify(data,null,2);

}

async function loadPortfolio(){

 const portfolio = {
  tokensOwned:5,
  portfolioValue:4200,
  yieldAPY:14.8
 };

 document.getElementById("portfolioStats").innerHTML = `

 Tokens Owned: ${portfolio.tokensOwned}<br>
 Portfolio Value: $${portfolio.portfolioValue}<br>
 Yield APY: ${portfolio.yieldAPY}%

 `;

}

async function init(){

 await loadTrending();

 await loadLiquidity();

 await loadPortfolio();

}

init();

