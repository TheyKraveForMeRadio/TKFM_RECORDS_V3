const API = "https://www.tkfmrecords.com/.netlify/functions";

async function fakeMint(){

  const user = localStorage.getItem("tkfm_user");

  const res = await fetch(API + "/fake-chain",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      action:"mint",
      user,
      catalog_id:"1"
    })
  });

  const data = await res.json();

  alert("NFT Minted (Simulated)");
}

async function loadMyNFTs(){

  const user = localStorage.getItem("tkfm_user");

  const res = await fetch(API + "/fake-chain",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({
      action:"my_nfts",
      user
    })
  });

  const data = await res.json();

  document.getElementById("nfts").innerHTML =
    data.map(n => `NFT ${n.id}`).join("<br>");
}
