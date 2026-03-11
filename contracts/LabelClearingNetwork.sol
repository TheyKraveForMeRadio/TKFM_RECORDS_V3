// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LabelClearingNetwork {

 struct Transfer {
  address from;
  address to;
  uint amount;
 }

 Transfer[] public settlements;

 function submitSettlement(
  address to,
  uint amount
 ) public {

  settlements.push(
   Transfer(msg.sender,to,amount)
  );

 }

 function getSettlements()
 public view
 returns(Transfer[] memory){

  return settlements;

 }

}
