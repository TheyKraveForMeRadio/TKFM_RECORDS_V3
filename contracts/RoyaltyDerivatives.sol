// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltyDerivatives {

 struct Order {
  address trader;
  uint amount;
  uint price;
 }

 Order[] public bids;
 Order[] public asks;

 function placeBid(uint amount,uint price) public {
  bids.push(Order(msg.sender,amount,price));
 }

 function placeAsk(uint amount,uint price) public {
  asks.push(Order(msg.sender,amount,price));
 }

 function getBids() public view returns(Order[] memory){
  return bids;
 }

 function getAsks() public view returns(Order[] memory){
  return asks;
 }

}
