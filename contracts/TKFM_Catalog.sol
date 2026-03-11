// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFM_Catalog {
    struct Release {
        address artist;
        string title;
        uint256 timestamp;
    }

    mapping(bytes32 => Release) public releases;

    event Cataloged(bytes32 indexed releaseId, address artist, string title);

    function register(
        bytes32 releaseId,
        address artist,
        string calldata title,
        uint256 timestamp
    ) external {
        require(releases[releaseId].timestamp == 0, "ALREADY REGISTERED");
        releases[releaseId] = Release(artist, title, timestamp);
        emit Cataloged(releaseId, artist, title);
    }
}
