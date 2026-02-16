// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract TKFMArtistNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("TKFM Artist NFT", "TKFMANFT") {}

    function mint(address to) external onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _mint(to, tokenId);

        // Emit standard ERC721 Transfer event
        emit Transfer(address(0), to, tokenId);

        return tokenId;
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter.current();
    }
}
