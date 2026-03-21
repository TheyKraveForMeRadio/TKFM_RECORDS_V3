import { ethers } from "ethers"

const provider = new ethers.JsonRpcProvider(process.env.ETH_RPC_URL)

const abi = [
"function ownerOf(uint256 tokenId) view returns (address)"
]

const contract = new ethers.Contract(
process.env.CATALOG_TOKEN_ADDRESS,
abi,
provider
)

export const handler = async(event)=>{

const tokenId = event.queryStringParameters.token_id

const owner = await contract.ownerOf(tokenId)

return {
statusCode:200,
body:JSON.stringify({
token_id:tokenId,
owner
})
}

}
