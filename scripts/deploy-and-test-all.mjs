import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
    console.log("=== DEPLOYER ===");
    const [deployer] = await ethers.getSigners();
    console.log("Address:", deployer.address);

    // --- DEPLOY TKFMToken ---
    const TokenFactory = await ethers.getContractFactory("TKFMToken");
    const tkfmToken = await TokenFactory.deploy();
    await tkfmToken.waitForDeployment();
    console.log("TKFMToken:", tkfmToken.target);

    // --- DEPLOY TKFMArtistNFT ---
    const ArtistNFTFactory = await ethers.getContractFactory("TKFMArtistNFT");
    const tkfmArtistNFT = await ArtistNFTFactory.deploy();
    await tkfmArtistNFT.waitForDeployment();
    console.log("TKFMArtistNFT:", tkfmArtistNFT.target);

    // --- DEPLOY TKFMReleaseNFT ---
    const ReleaseNFTFactory = await ethers.getContractFactory("TKFMReleaseNFT");
    const tkfmReleaseNFT = await ReleaseNFTFactory.deploy();
    await tkfmReleaseNFT.waitForDeployment();
    console.log("TKFMReleaseNFT:", tkfmReleaseNFT.target);

    // --- DEPLOY TKFMRecords ---
    const RecordsFactory = await ethers.getContractFactory("TKFMRecords");
    const tkfmRecords = await RecordsFactory.deploy();
    await tkfmRecords.waitForDeployment();
    console.log("TKFMRecords:", tkfmRecords.target);

    // --- CREATE A RELEASE ---
    const payees = [deployer.address];
    const amounts = [1000];
    const shares  = [10000]; // 100% in basis points

    const tx = await tkfmRecords.createRelease(payees, amounts, shares);
    const receipt = await tx.wait();

    // ethers v6: parse logs for ReleaseCreated
    const logs = receipt.logs.map(log => {
        try {
            return tkfmRecords.interface.parseLog(log);
        } catch {
            return null;
        }
    }).filter(l => l !== null);

    const releaseCreatedEvent = logs.find(e => e.name === "ReleaseCreated");
    if (!releaseCreatedEvent) throw new Error("No ReleaseCreated event found");

    const releaseId = releaseCreatedEvent.args.releaseId;
    console.log("Release", releaseId.toString(), "created");

    // --- FINALIZE RELEASE ---
    const finalizeTx = await tkfmRecords.finalizeRelease(releaseId);
    await finalizeTx.wait();
    console.log("Release", releaseId.toString(), "finalized");
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
