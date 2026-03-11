import fs from "fs";
import { ethers } from "ethers";

const ARTIST_PRIVATE_KEY = process.env.ARTIST_PRIVATE_KEY;
const AUTHORITY_ADDRESS = process.env.TKFM_AUTHORITY_ADDRESS;

if (!ARTIST_PRIVATE_KEY || !AUTHORITY_ADDRESS) {
  console.error("Missing env vars");
  process.exit(1);
}

const wallet = new ethers.Wallet(ARTIST_PRIVATE_KEY);

const domain = {
  name: "TKFM Authority",
  version: "1",
  chainId: 31337,
  verifyingContract: AUTHORITY_ADDRESS
};

const types = {
  Release: [
    { name: "releaseId", type: "bytes32" },
    { name: "artist", type: "address" },
    { name: "title", type: "string" },
    { name: "timestamp", type: "uint256" }
  ]
};

const title = process.argv[2] || "Untitled Release";
const timestamp = Math.floor(Date.now() / 1000);

const releaseId = ethers.keccak256(
  ethers.toUtf8Bytes(`${wallet.address}:${title}`)
);

const value = {
  releaseId,
  artist: wallet.address,
  title,
  timestamp
};

const signature = await wallet.signTypedData(domain, types, value);

const payload = {
  releaseId,
  artist: wallet.address,
  title,
  timestamp,
  signature
};

fs.writeFileSync("signed-release.json", JSON.stringify(payload, null, 2));

console.log("SIGNED RELEASE WRITTEN: signed-release.json");
