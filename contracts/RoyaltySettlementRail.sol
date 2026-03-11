// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltySettlementRail {

 event RoyaltyPaid(
  address artist,
  uint amount
 );

 function settleRoyalty(
  address artist
 ) external payable {

  payable(artist).transfer(msg.value);

  emit RoyaltyPaid(
   artist,
   msg.value
  );

 }

}
