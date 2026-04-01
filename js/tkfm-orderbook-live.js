const API = "https://www.tkfmrecords.com/.netlify/functions";

async function loadOrderbook(){

  const res = await fetch(API + "/get-orderbook-engine");
  const data = await res.json();

  const buys = data.buys || [];
  const sells = data.sells || [];

  // 🔥 BIDS (BUY SIDE)
  document.getElementById("bids").innerHTML =
    buys.map(b => `
      <div class="row">
        <span class="price-up">$${b.price}</span>
        <span>${b.shares}</span>
      </div>
    `).join("");

  // 🔥 ASKS (SELL SIDE)
  document.getElementById("asks").innerHTML =
    sells.map(s => `
      <div class="row">
        <span class="price-down">$${s.price}</span>
        <span>${s.shares}</span>
      </div>
    `).join("");

}

// 🔥 LIVE LOOP
setInterval(loadOrderbook, 2000);
