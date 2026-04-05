(function(){

  async function getRole(){

    const user = localStorage.getItem("tkfm_user");

    if(!user) return "guest";

    try{
      const res = await fetch("/.netlify/functions/login", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ username: user })
      });

      const data = await res.json();

      return data.role || "guest";

    }catch{
      return "guest";
    }
  }

  async function injectNav(){

    const role = await getRole();
    const user = localStorage.getItem("tkfm_user");

    let menuHTML = "";

    if(role === "admin"){
      menuHTML = `
        <a href="/admin-dashboard.html">Admin</a>
        <a href="/tkfm-owner-console.html">Console</a>
        <a href="/pro-trading-ui.html">Trade</a>
      `;
    }

    else if(role === "investor"){
      menuHTML = `
        <a href="/tkfm-investor-dashboard.html">Dashboard</a>
        <a href="/tkfm-invest-song.html">Invest</a>
        <a href="/pro-trading-ui.html">Trade</a>
      `;
    }

    else if(role === "user"){
      menuHTML = `
        <a href="/user-dashboard.html">My Account</a>
        <a href="/pro-trading-ui.html">Trade</a>
      `;
    }

    else{
      menuHTML = `
        <a href="/tkfm-hub.html">Home</a>
        <a href="/pro-trading-ui.html">Market</a>
      `;
    }

    // 🔥 WALLET DISPLAY
    if(user){
      menuHTML += `<span style="color:#22c55e">${user.slice(0,6)}...</span>`;
    }

    const nav = document.createElement("div");

    nav.innerHTML = `
<style>
#tkfm-nav{
  position:fixed;
  top:0;
  width:100%;
  background:#020617;
  border-bottom:1px solid #facc15;
  padding:10px;
  display:flex;
  justify-content:space-between;
  z-index:9999;
  font-family:Arial;
}

a{ color:#facc15; margin-right:15px; text-decoration:none; }
</style>

<div id="tkfm-nav">
  <div>🚀 TKFM</div>
  <div>${menuHTML}</div>
</div>
`;

    document.body.prepend(nav);
    document.body.style.paddingTop = "50px";
  }

  injectNav();

})();
