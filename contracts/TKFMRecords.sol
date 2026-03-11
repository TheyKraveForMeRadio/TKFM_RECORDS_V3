// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract TKFMRecords {

    struct Release {
        address[] payees;
        uint256[] amounts;
        uint256[] shares;
        bool finalized;
    }

    mapping(uint256 => Release) public releases;
    uint256 public releaseCount;

    // EVENTS
    event ReleaseCreated(uint256 indexed releaseId);
    event ReleaseFinalized(uint256 indexed releaseId);

    function createRelease(
        address[] memory payees,
        uint256[] memory amounts,
        uint256[] memory shares
    ) external returns (uint256) {
        releaseCount += 1;
        releases[releaseCount] = Release(payees, amounts, shares, false);

        // emit properly
        emit ReleaseCreated(releaseCount);
        return releaseCount;
    }

    function finalizeRelease(uint256 releaseId) external {
        Release storage r = releases[releaseId];
        require(!r.finalized, "Already finalized");
        r.finalized = true;

        emit ReleaseFinalized(releaseId);
    }
}
