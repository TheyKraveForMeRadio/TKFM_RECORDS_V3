// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CatalogNFT is ERC721 {

 uint public nextToken;

 mapping(uint => string) public metadata;

 constructor()
 ERC721("TKFM Catalog","TKCAT")
 {}

 function mint(
  address to,
  string memory uri
 ) external {

  uint id = nextToken++;

  _mint(to,id);

  metadata[id] = uri;

 }

}
