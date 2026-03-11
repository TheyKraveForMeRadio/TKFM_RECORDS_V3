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
