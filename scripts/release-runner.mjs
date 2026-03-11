import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTHORITY_ADDRESS = process.env.TKFM_AUTHORITY_ADDRESS;
const ARTIST_KEY = process.env.ARTIST_PRIVATE_KEY;

if (!AUTHORITY_ADDRESS || !ARTIST_KEY) {
  console.error("Missing env vars");
  process.exit(1);
}

const abiPath = path.join(
  __dirname,
  "../artifacts/contracts/TKFM_Authority.sol/TKFM_Authority.json"
);

const abi = JSON.parse(fs.readFileSync(abiPath)).abi;

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(ARTIST_KEY, provider);
const authority = new ethers.Contract(AUTHORITY_ADDRESS, abi, signer);

const tracks = [
  "Track One",
  "Track Two",
  "Track Three"
];

async function run() {
  let nonce = await provider.getTransactionCount(signer.address);

  for (const title of tracks) {
    const releaseId = ethers.keccak256(
      ethers.toUtf8Bytes(`${signer.address}:${title}`)
    );

    try {
      const tx = await authority.emitReleaseEvent(
        releaseId,
        signer.address,
        title,
        { nonce }
      );

      const receipt = await tx.wait();
      console.log(
        `Released ${title} | TxHash: ${receipt.hash}`
      );

      nonce++;
    } catch (err) {
      console.error(`Failed ${title}:`, err.shortMessage || err.message);
    }
  }
}

run();
