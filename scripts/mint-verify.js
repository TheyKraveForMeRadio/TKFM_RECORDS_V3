// scripts/mint-verify.js
import hre from "hardhat";

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    // 🔁 CHANGE THIS: your deployed TKFMToken address
    const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // 🔁 CHANGE THESE: tokenId and amount
    const TOKEN_ID = 1;
    const AMOUNT = 1000;

    console.log("👤 Minting with account:", deployer.address);

    // Hardhat 3.x + Ethers 6: get contract factory + attach
    const TKFMToken = await hre.ethers.getContractFactory("TKFMToken");
    const token = TKFMToken.attach(TOKEN_ADDRESS).connect(deployer);

    // Mint ERC1155 token
    const tx = await token.mint(deployer.address, TOKEN_ID, AMOUNT);
    await tx.wait();

    console.log("✅ MINT COMPLETE");
    console.log("To:", deployer.address);
    console.log("Token ID:", TOKEN_ID);
    console.log("Amount:", AMOUNT);

    // Verify balance
    const balance = await token.balanceOf(deployer.address, TOKEN_ID);
    console.log("📊 BALANCE VERIFIED");
    console.log("Address:", deployer.address);
    console.log("Token ID:", TOKEN_ID);
    console.log("Balance:", balance.toString());
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
