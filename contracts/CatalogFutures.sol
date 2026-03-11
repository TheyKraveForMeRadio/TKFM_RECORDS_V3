// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CatalogFutures {

 struct Future {
  address trader;
  uint catalogId;
  uint strikePrice;
  uint expiry;
 }

 Future[] public futures;

 function createFuture(
  uint catalogId,
  uint strikePrice,
  uint expiry
 ) public {

  futures.push(
   Future(
    msg.sender,
    catalogId,
    strikePrice,
    expiry
   )
  );

 }

 function getFutures()
 public view
 returns(Future[] memory){
  return futures;
 }

}
