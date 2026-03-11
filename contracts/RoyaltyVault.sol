// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltyVault {

 mapping(address => uint256) public balances;

 function deposit() external payable {

  balances[msg.sender] += msg.value;

 }

 function distribute(
  address to,
  uint amount
 ) external {

  payable(to).transfer(amount);

 }

}
