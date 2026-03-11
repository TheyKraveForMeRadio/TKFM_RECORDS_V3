// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrossChainBridge {

 mapping(bytes32 => bool) public processed;

 event BridgeTransfer(
  address user,
  uint amount,
  string targetChain
 );

 function bridgeToSolana(
  uint amount
 ) external {

  emit BridgeTransfer(
   msg.sender,
   amount,
   "solana"
  );

 }

 function confirmFromSolana(
  bytes32 txHash,
  address user,
  uint amount
 ) external {

  require(!processed[txHash]);

  processed[txHash] = true;

  payable(user).transfer(amount);

 }

}
