const API = "https://www.tkfmrecords.com/.netlify/functions";

let lastPrice = 0;

async function loadMarket(){

  const res = await fetch(API + "/market-stream");
  const data = await res.json();

  if(!data || data.length === 0) return;

  const latest = data[0];

  const priceEl = document.getElementById("live-price");

  if(priceEl){
    animatePrice(priceEl, latest.price, lastPrice);
    lastPrice = latest.price;
  }

  document.getElementById("live-trades").innerHTML =
    data.map(t => `
      <div>
        $${t.price} • ${t.shares} shares
      </div>
    `).join("");
}

// 🔥 LOOP (REAL-TIME FEEL)
setInterval(loadMarket, 2000);
