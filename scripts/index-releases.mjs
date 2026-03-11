import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { JsonRpcProvider, Contract } from "ethers";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { TKFM_AUTHORITY_ADDRESS } = process.env;

if (!TKFM_AUTHORITY_ADDRESS) {
  throw new Error("TKFM_AUTHORITY_ADDRESS not set");
}

const provider = new JsonRpcProvider("http://127.0.0.1:8545");

const authorityABIPath = path.join(
  __dirname,
  "../artifacts/contracts/TKFM_Authority.sol/TKFM_Authority.json"
);

const AuthorityABI = JSON.parse(
  fs.readFileSync(authorityABIPath, "utf8")
).abi;

const authority = new Contract(
  TKFM_AUTHORITY_ADDRESS,
  AuthorityABI,
  provider
);

async function index() {
  console.log("=== INDEXING RELEASE EVENTS ===");

  const filter = authority.filters.ReleaseVerified();
  const events = await authority.queryFilter(filter, 0, "latest");

  const releases = events.map(e => ({
    releaseId: e.args.releaseId,
    artist: e.args.artist,
    title: e.args.title,
    timestamp: Number(e.args.timestamp),
    blockNumber: e.blockNumber,
    txHash: e.transactionHash
  }));

  console.log(`Found ${releases.length} releases\n`);

  for (const r of releases) {
    console.log("Title:", r.title);
    console.log("Artist:", r.artist);
    console.log("Timestamp:", r.timestamp);
    console.log("Tx:", r.txHash);
    console.log("----------");
  }

  fs.writeFileSync(
    path.join(__dirname, "../releases.json"),
    JSON.stringify(releases, null, 2)
  );

  console.log("Saved to releases.json");
}

index().catch(console.error);
