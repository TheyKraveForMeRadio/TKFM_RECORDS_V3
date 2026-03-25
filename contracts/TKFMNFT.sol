// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMNFT is ERC721, Ownable {

    uint256 public tokenCounter;

    constructor() ERC721("TKFM Music NFT", "TKFM") {
        tokenCounter = 0;
    }

    function mint(string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenCounter;

        _safeMint(msg.sender, newItemId);

        tokenCounter++;

        return newItemId;
    }
}
