import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  Contract,
  Wallet,
  JsonRpcProvider,
  id
} from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const {
  TKFM_AUTHORITY_ADDRESS,
  ARTIST_PRIVATE_KEY
} = process.env;

if (!TKFM_AUTHORITY_ADDRESS)
  throw new Error("TKFM_AUTHORITY_ADDRESS not set");

if (!ARTIST_PRIVATE_KEY)
  throw new Error("ARTIST_PRIVATE_KEY not set");

// Load Authority ABI
const authorityABIPath = path.join(
  __dirname,
  "../artifacts/contracts/TKFM_Authority.sol/TKFM_Authority.json"
);

if (!fs.existsSync(authorityABIPath))
  throw new Error("ABI for TKFM_Authority not found in artifacts");

const AuthorityABI = JSON.parse(
  fs.readFileSync(authorityABIPath, "utf8")
).abi;

// Provider + Signer
const provider = new JsonRpcProvider("http://127.0.0.1:8545");
const signer = new Wallet(ARTIST_PRIVATE_KEY, provider);
const authority = new Contract(
  TKFM_AUTHORITY_ADDRESS,
  AuthorityABI,
  signer
);

// Tracks to release
const tracks = [
  { title: "Track One" },
  { title: "Track Two" },
  { title: "Track Three" }
];

async function runPipeline() {
  console.log("=== TKFM PIPELINE START ===");

  const signerAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);

  console.log("Signer:", signerAddress);
  console.log("ChainId:", chainId);

  const domain = {
    name: "TKFM Authority",
    version: "1",
    chainId: chainId,
    verifyingContract: TKFM_AUTHORITY_ADDRESS
  };

  const types = {
    Release: [
      { name: "releaseId", type: "bytes32" },
      { name: "artist", type: "address" },
      { name: "title", type: "string" },
      { name: "timestamp", type: "uint256" }
    ]
  };

  for (const t of tracks) {

    const timestamp = Math.floor(Date.now() / 1000);
    const releaseId = id(t.title + timestamp.toString());

    const value = {
      releaseId,
      artist: signerAddress,
      title: t.title,
      timestamp
    };

    const signature = await signer.signTypedData(domain, types, value);

    // 100% to artist (modify later for splits)
    const wallets = [signerAddress];
    const bps = [10000];

    try {
      console.log(`Submitting ${t.title}...`);

      const tx = await authority.verifyAndEmitRelease(
        releaseId,
        signerAddress,
        t.title,
        timestamp,
        signature,
        wallets,
        bps
      );

      const receipt = await tx.wait();

      console.log(
        `Released ${t.title} | TxHash: ${receipt.hash}`
      );

    } catch (err) {
      console.error(
        `Error releasing ${t.title}:`,
        err?.shortMessage || err?.message || err
      );
    }
  }

  console.log("=== TKFM PIPELINE END ===");
}

runPipeline().catch((e) => {
  console.error("PIPELINE ERROR:", e);
  process.exit(1);
});
