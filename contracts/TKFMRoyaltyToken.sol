// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TKFMRoyaltyToken is ERC20 {

 constructor(uint256 supply)
 ERC20("TKFM Royalty Token","TKR") {

  _mint(msg.sender,supply);

 }

}
