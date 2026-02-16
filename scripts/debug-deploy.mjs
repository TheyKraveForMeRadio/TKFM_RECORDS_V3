import hre from "hardhat";

async function main() {
  const names = [
    "TKFMToken",
    "TKFMRecords",
    "TKFMArtistNFT",
    "TKFMRoyaltySplitter"
  ];

  console.log("=== Constructor signatures ===");
  for (const name of names) {
    try {
      const Factory = await hre.ethers.getContractFactory(name);
      const constructorFragment = Factory.interface.fragments.find(f => f.type === "constructor");
      if (!constructorFragment || constructorFragment.inputs.length === 0) {
        console.log(`${name}: (no constructor args)`);
      } else {
        console.log(
          `${name}:`,
          constructorFragment.inputs.map(i => `${i.name || "(arg)"}:${i.type}`).join(", ")
        );
      }
    } catch (e) {
      console.error(`${name}: ERROR reading factory -`, e.message);
    }
  }

  console.log("\n=== Safe, step-by-step deployment ===");

  // 1) Deploy TKFMToken
  let token;
  try {
    const TokenFactory = await hre.ethers.getContractFactory("TKFMToken");
    console.log("Deploying TKFMToken with no args...");
    token = await TokenFactory.deploy();
    await token.waitForDeployment();
    console.log("TKFMToken deployed to:", token.target);
  } catch (e) {
    console.error("TKFMToken deploy FAILED:", e.message);
    return;
  }

  // 2) Deploy TKFMRecords with token address
  let records;
  try {
    const RecordsFactory = await hre.ethers.getContractFactory("TKFMRecords");
    const required = RecordsFactory.interface.fragments.find(f => f.type === "constructor");
    const reqLen = required ? required.inputs.length : 0;
    console.log(`TKFMRecords constructor expects ${reqLen} args`);
    console.log("Deploying TKFMRecords with token address...");
    records = await RecordsFactory.deploy(token.target);
    await records.waitForDeployment();
    console.log("TKFMRecords deployed to:", records.target);
  } catch (e) {
    console.error("TKFMRecords deploy FAILED:", e.message);
    return;
  }

  // 3) Deploy TKFMArtistNFT (no args expected)
  let artistNFT;
  try {
    const ArtistFactory = await hre.ethers.getContractFactory("TKFMArtistNFT");
    console.log("Deploying TKFMArtistNFT with no args...");
    artistNFT = await ArtistFactory.deploy();
    await artistNFT.waitForDeployment();
    console.log("TKFMArtistNFT deployed to:", artistNFT.target);
  } catch (e) {
    console.error("TKFMArtistNFT deploy FAILED:", e.message);
    return;
  }

  // 4) Deploy TKFMRoyaltySplitter with arrays
  try {
    const SplitterFactory = await hre.ethers.getContractFactory("TKFMRoyaltySplitter");
    const constructorFragment = SplitterFactory.interface.fragments.find(f => f.type === "constructor");
    console.log("TKFMRoyaltySplitter constructor:", constructorFragment ? constructorFragment.inputs.map(i => `${i.name || '(arg)'}:${i.type}`).join(", ") : "(none)");
    const payees = [ (await hre.ethers.getSigners())[0].address, records.target ];
    const shares = [50, 50];
    console.log("Deploying TKFMRoyaltySplitter with sample payees & shares...");
    const splitter = await SplitterFactory.deploy(payees, shares);
    await splitter.waitForDeployment();
    console.log("TKFMRoyaltySplitter deployed to:", splitter.target);
  } catch (e) {
    console.error("TKFMRoyaltySplitter deploy FAILED:", e.message);
    return;
  }

  // 5) Transfer authority and lock minting (if functions exist)
  try {
    if (token && records) {
      if (typeof token.transferAuthority === "function") {
        console.log("Transferring authority to Records...");
        const tx = await token.transferAuthority(records.target);
        await tx.wait();
        console.log("transferAuthority tx mined");
      } else {
        console.log("token.transferAuthority() missing in ABI — skipping transferAuthority step.");
      }
      if (typeof token.lockMinting === "function") {
        console.log("Locking minting...");
        const lt = await token.lockMinting();
        await lt.wait();
        console.log("lockMinting tx mined");
      } else {
        console.log("token.lockMinting() missing in ABI — skipping lockMinting step.");
      }
    }
  } catch (e) {
    console.error("Authority/Lock step FAILED:", e.message);
  }

  console.log("\n=== DONE ===");
}

main().catch((err) => {
  console.error("UNCAUGHT ERROR:", err);
  process.exitCode = 1;
});
