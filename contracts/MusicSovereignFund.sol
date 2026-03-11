// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicSovereignFund {

 struct Investment {
  address investor;
  uint amount;
 }

 Investment[] public investments;

 function invest() external payable {

  investments.push(
   Investment(msg.sender,msg.value)
  );

 }

 function getInvestments()
 public view
 returns(Investment[] memory){

  return investments;

 }

}
