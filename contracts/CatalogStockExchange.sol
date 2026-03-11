// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CatalogStockExchange {

 struct Listing {
  uint catalogId;
  uint price;
  address owner;
 }

 Listing[] public listings;

 function listCatalog(
  uint catalogId,
  uint price
 ) public {

  listings.push(
   Listing(
    catalogId,
    price,
    msg.sender
   )
  );

 }

 function getListings()
 public view
 returns(Listing[] memory){

  return listings;

 }

}
