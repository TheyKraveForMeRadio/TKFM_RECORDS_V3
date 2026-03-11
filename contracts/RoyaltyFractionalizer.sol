// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RoyaltyToken.sol";

contract RoyaltyFractionalizer {

 mapping(uint => address) public pools;

 function fractionalize(
  uint catalogId,
  string memory name,
  string memory symbol,
  uint supply
 ) public {

  RoyaltyToken token =
  new RoyaltyToken(
   name,
   symbol,
   supply,
   msg.sender
  );

  pools[catalogId] =
  address(token);

 }

}
