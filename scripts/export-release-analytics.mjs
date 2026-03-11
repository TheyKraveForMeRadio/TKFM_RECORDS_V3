import fs from 'fs';
import path from 'path';
import pkg from 'hardhat';
const { ethers } = pkg;

const DEPLOYED_JSON = path.join(process.cwd(), 'deployed.json');

async function main() {
    // Ensure deployed.json exists
    let deployed = {};
    if (fs.existsSync(DEPLOYED_JSON)) {
        deployed = JSON.parse(fs.readFileSync(DEPLOYED_JSON, 'utf-8'));
    } else {
        console.log("deployed.json not found, creating a new one...");
        fs.writeFileSync(DEPLOYED_JSON, JSON.stringify({}, null, 2));
    }

    console.log("=== DEPLOYED CONTRACTS ===");
    for (const [name, addr] of Object.entries(deployed)) {
        console.log(`${name}: ${addr}`);
    }

    // Connect to deployed contracts
    if (!deployed.TKFMToken || !deployed.TKFMReleaseNFT || !deployed.TKFMRecords) {
        console.warn("Some contracts are missing from deployed.json, skipping analytics.");
        return;
    }

    const [deployer] = await ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    const tkfmToken = await ethers.getContractAt("TKFMToken", deployed.TKFMToken);
    const tkfmReleaseNFT = await ethers.getContractAt("TKFMReleaseNFT", deployed.TKFMReleaseNFT);
    const tkfmRecords = await ethers.getContractAt("TKFMRecords", deployed.TKFMRecords);

    console.log("\n=== TOKEN BALANCES ===");
    const deployerBalance = await tkfmToken.balanceOf(deployer.address);
    console.log(`TKFMToken balance of deployer: ${ethers.utils.formatUnits(deployerBalance, 18)}`);

    console.log("\n=== NFT RELEASES ===");
    const totalReleases = await tkfmReleaseNFT.totalSupply();
    console.log(`Total Release NFTs: ${totalReleases.toString()}`);
    for (let i = 0; i < totalReleases; i++) {
        const tokenId = await tkfmReleaseNFT.tokenByIndex(i);
        const owner = await tkfmReleaseNFT.ownerOf(tokenId);
        console.log(`Release NFT ID: ${tokenId.toString()} | Owner: ${owner}`);
    }

    console.log("\n=== RECORDS INFO ===");
    const totalRecords = await tkfmRecords.totalReleases();
    console.log(`Total Releases in Records contract: ${totalRecords.toString()}`);
    for (let i = 0; i < totalRecords; i++) {
        const release = await tkfmRecords.getRelease(i);
        console.log(`Release ${i}:`, release);
    }
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error("Error in export-release-analytics:", err);
        process.exit(1);
    });
