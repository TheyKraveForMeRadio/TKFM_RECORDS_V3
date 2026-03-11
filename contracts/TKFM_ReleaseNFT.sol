// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFM_ReleaseNFT is ERC721, Ownable {

    uint256 public tokenCounter;
    address public royalties;

    mapping(bytes32 => uint256) public releaseToToken;

    constructor() ERC721("TKFM Release NFT", "TKFMREL") {}

    function setRoyalties(address _royalties) external onlyOwner {
        royalties = _royalties;
    }

    function mintTo(address to, bytes32 releaseId) external {
        require(msg.sender == royalties, "Not royalties contract");
        require(releaseToToken[releaseId] == 0, "Already minted");

        tokenCounter++;
        uint256 newTokenId = tokenCounter;

        _safeMint(to, newTokenId);
        releaseToToken[releaseId] = newTokenId;
    }
}
