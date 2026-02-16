// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

struct Track {
    string title;
    string artist;
    uint256 releaseDate;
    string ipfsHash;
}

contract TKFMCatalog is Ownable {
    Track[] public tracks;

    function addTrack(string memory title, string memory artist, uint256 releaseDate, string memory ipfsHash) external onlyOwner {
        tracks.push(Track(title, artist, releaseDate, ipfsHash));
    }

    function getTrack(uint256 index) external view returns (Track memory) {
        return tracks[index];
    }
}
