// scripts/deploy-mint-verify.js
const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("👤 Deploying with account:", deployer.address);

    // 1️⃣ Deploy TKFMToken
    const TKFMToken = await hre.ethers.getContractFactory("TKFMToken");
    const token = await TKFMToken.deploy("https://tkfmrecords.com/metadata/{id}.json");
    await token.waitForDeployment(); // Hardhat 3.x / Ethers 6
    console.log("🏗 TKFMToken deployed to:", token.target);

    // 2️⃣ Mint ERC1155 token
    const TOKEN_ID = 1;
    const AMOUNT = 1000;
    const TO_ADDRESS = deployer.address;

    console.log("🔹 Minting token...");
    const tx = await token.mint(TO_ADDRESS, TOKEN_ID, AMOUNT);
    await tx.wait();
    console.log("✅ MINT COMPLETE");
    console.log("To:", TO_ADDRESS);
    console.log("Token ID:", TOKEN_ID);
    console.log("Amount:", AMOUNT);

    // 3️⃣ Verify balance
    const balance = await token.balanceOf(TO_ADDRESS, TOKEN_ID);
    console.log("📊 BALANCE VERIFIED");
    console.log("Address:", TO_ADDRESS);
    console.log("Token ID:", TOKEN_ID);
    console.log("Balance:", balance.toString());
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
