import { ethers } from "ethers";
import fs from "fs";

const PRIVATE_KEY = process.env.ARTIST_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("ARTIST_PRIVATE_KEY missing");

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

const domain = {
  name: "TKFM_RECORDS",
  version: "1",
  chainId: 31337,
  verifyingContract: process.env.TKFM_AUTHORITY_ADDRESS
};

export async function signRelease({
  releaseId,
  artist,
  metadataURI,
  nonce,
  deadline
}) {
  const types = {
    Release: [
      { name: "releaseId", type: "bytes32" },
      { name: "artist", type: "address" },
      { name: "metadataURI", type: "string" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" }
    ]
  };

  const value = {
    releaseId,
    artist,
    metadataURI,
    nonce,
    deadline
  };

  return await wallet.signTypedData(domain, types, value);
}
