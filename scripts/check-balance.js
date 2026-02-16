// scripts/check-balance.js
const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();

    // ✅ Deployed token address
    const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // TKFMToken
    const TOKEN_ID = 1;   // the specific tokenId to check

    // Get the deployed contract
    const token = await hre.ethers.getContractAt("TKFMToken", TOKEN_ADDRESS, owner);

    // Check balance
    const balance = await token.balanceOf(owner.address, TOKEN_ID);

    console.log("📊 BALANCE CHECK");
    console.log("Address:", owner.address);
    console.log("Token ID:", TOKEN_ID);
    console.log("Balance:", balance.toString());
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
