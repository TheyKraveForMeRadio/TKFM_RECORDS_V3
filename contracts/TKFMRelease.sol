// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/finance/PaymentSplitter.sol";
import "./TKFMArtistNFT.sol";
import "./TKFMToken.sol";

contract TKFMRelease is Ownable {
    string public name;
    TKFMArtistNFT public artistNFT;
    TKFMToken public token;
    PaymentSplitter public splitter;

    bool public accepted;
    uint256 public releaseId;

    constructor(
        string memory _name,
        address _artistNFT,
        address _token,
        address[] memory payees,
        uint256[] memory shares,
        uint256 _releaseId
    ) {
        name = _name;
        artistNFT = TKFMArtistNFT(_artistNFT);
        token = TKFMToken(_token);
        releaseId = _releaseId;
        splitter = new PaymentSplitter(payees, shares);
    }

    function signRelease() external {
        require(!accepted, "Already accepted");
        require(artistNFT.ownerOf(releaseId) == msg.sender, "Not your NFT");
        accepted = true;
    }

    function withdraw() external {
        splitter.release(payable(msg.sender));
    }
}
