// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFM_MusicAsset is ERC721, Ownable {

uint256 public nextTokenId;

struct CatalogAsset {
string catalogId;
address creator;
uint256 shares;
}

mapping(uint256 => CatalogAsset) public catalogAssets;

constructor() ERC721("TKFM Music Asset","TKFM") {}

function mintAsset(
address to,
string memory catalogId,
uint256 shares
) public onlyOwner {

uint256 tokenId = nextTokenId++;

_safeMint(to, tokenId);

catalogAssets[tokenId] = CatalogAsset({
catalogId: catalogId,
creator: to,
shares: shares
});

}

}
