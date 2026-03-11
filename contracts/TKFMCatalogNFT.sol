// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TKFMCatalogNFT is ERC721 {

 uint256 public nextId;

 mapping(uint256 => string) public metadata;

 constructor() ERC721("TKFM Catalog","TKCAT") {}

 function mint(
  address to,
  string memory uri
 ) public {

  _mint(to,nextId);

  metadata[nextId] = uri;

  nextId++;

 }

}
