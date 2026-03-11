import { ethers } from "ethers";
import AuthorityABI from "../artifacts/contracts/TKFM_Authority.sol/TKFM_Authority.json" assert { type: "json" };

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

export async function submitSignedRelease({
  authorityAddress,
  releaseId,
  artist,
  metadataURI,
  deadline,
  signature
}) {
  const contract = new ethers.Contract(
    authorityAddress,
    AuthorityABI.abi,
    provider.getSigner()
  );

  const tx = await contract.verifyRelease(
    releaseId,
    artist,
    metadataURI,
    deadline,
    signature
  );

  const receipt = await tx.wait();

  const events = receipt.logs
    .map(log => {
      try {
        return contract.interface.parseLog(log);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  if (!events.length) {
    throw new Error("NO_EVENTS_EMITTED");
  }

  return events;
}
