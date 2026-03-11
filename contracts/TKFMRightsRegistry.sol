// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFMRightsRegistry {

 struct Catalog {
  string title;
  address owner;
  string metadataURI;
 }

 uint256 public nextCatalogId;

 mapping(uint256 => Catalog) public catalogs;

 event CatalogRegistered(uint256 id,string title,address owner);

 function registerCatalog(
  string memory title,
  string memory metadataURI
 ) public {

  catalogs[nextCatalogId] = Catalog(
   title,
   msg.sender,
   metadataURI
  );

  emit CatalogRegistered(
   nextCatalogId,
   title,
   msg.sender
  );

  nextCatalogId++;

 }

}
