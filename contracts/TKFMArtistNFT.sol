// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMArtistNFT is ERC721, Ownable {
    uint256 private _nextId = 1;

    mapping(address => bool) private _hasArtist;

    constructor() ERC721("TKFM Artist", "TKFMA") {}

    function hasArtist(address artist) external view returns (bool) {
        return _hasArtist[artist];
    }

    function mint(address artist) external onlyOwner returns (uint256) {
        require(!_hasArtist[artist], "Artist already minted");

        uint256 tokenId = _nextId++;
        _hasArtist[artist] = true;
        _safeMint(artist, tokenId);

        return tokenId;
    }
}
