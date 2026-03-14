import { ethers } from "ethers"

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL)

const wallet = new ethers.Wallet(
process.env.TKFM_PRIVATE_KEY,
provider
)

const abi = [
"function mintAsset(address to,string catalogId,uint256 shares)"
]

const contract = new ethers.Contract(
process.env.CATALOG_TOKEN_ADDRESS,
abi,
wallet
)

export const handler = async(event)=>{

const body = JSON.parse(event.body)

const tx = await contract.mintAsset(
body.owner,
body.catalog_id,
body.shares
)

await tx.wait()

return {
statusCode:200,
body:JSON.stringify({
status:"asset minted",
tx:tx.hash
})
}

}
