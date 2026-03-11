import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTHORITY_ADDRESS = process.env.TKFM_AUTHORITY_ADDRESS;
const AUTHORITY_KEY = process.env.ARTIST_PRIVATE_KEY;

if (!fs.existsSync("signed-release.json")) {
  throw new Error("signed-release.json not found");
}

const raw = fs.readFileSync("signed-release.json", "utf8");
if (!raw.trim()) {
  throw new Error("signed-release.json is empty");
}

const input = JSON.parse(raw);

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(AUTHORITY_KEY, provider);

const abi = JSON.parse(
  fs.readFileSync(
    path.join(
      __dirname,
      "../artifacts/contracts/TKFM_Authority.sol/TKFM_Authority.json"
    ),
    "utf8"
  )
).abi;

const authority = new ethers.Contract(AUTHORITY_ADDRESS, abi, signer);

const tx = await authority.verifyAndEmitRelease(
  input.releaseId,
  input.artist,
  input.title,
  input.timestamp,
  input.signature
);

const receipt = await tx.wait();

console.log("RELEASE VERIFIED & EMITTED");
console.log("TxHash:", receipt.hash);
