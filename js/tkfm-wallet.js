let provider;
let signer;
let userAddress;

async function connectWallet(){

if(!window.ethereum){
alert("Metamask not installed");
return;
}

provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send("eth_requestAccounts",[]);

signer = provider.getSigner();

userAddress = await signer.getAddress();

document.getElementById("walletAddress").innerText =
"Wallet: "+userAddress;

}

async function getBalance(){

const balance = await provider.getBalance(userAddress);

return ethers.utils.formatEther(balance);

}

window.connectWallet = connectWallet;
window.getBalance = getBalance;

// 🔗 LINK WALLET TO BACKEND USER
async function linkWalletToUser(wallet){

  const token = localStorage.getItem("token")

  if(!token) return

  await fetch("https://tkfm-records-v3.onrender.com/engine/link-wallet-engine", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Authorization":"Bearer " + token
    },
    body: JSON.stringify({ wallet })
  })

  console.log("Wallet linked to user:", wallet)
}
