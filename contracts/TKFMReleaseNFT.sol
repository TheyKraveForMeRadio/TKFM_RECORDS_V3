// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMReleaseNFT is Ownable {
    struct Split {
        address[] payees;
        uint256[] shares; // basis points (10000 = 100%)
        uint256 totalWithdrawn;
        mapping(address => uint256) withdrawn;
    }

    mapping(uint256 => Split) private splits;

    event ReleaseInitialized(
        uint256 indexed releaseId
    );

    event Withdrawn(
        uint256 indexed releaseId,
        address indexed payee,
        uint256 amount
    );

    function createRelease(
        uint256 releaseId,
        address[] calldata payees,
        uint256[] calldata shares
    ) external onlyOwner {
        require(payees.length == shares.length, "Length mismatch");
        require(payees.length > 0, "No payees");

        uint256 total;
        for (uint256 i = 0; i < shares.length; i++) {
            total += shares[i];
        }
        require(total == 10000, "Shares must equal 10000");

        Split storage s = splits[releaseId];
        s.payees = payees;
        s.shares = shares;

        emit ReleaseInitialized(releaseId);
    }

    function withdrawable(
        uint256 releaseId,
        address payee
    ) external view returns (uint256) {
        Split storage s = splits[releaseId];

        uint256 idx = type(uint256).max;
        for (uint256 i = 0; i < s.payees.length; i++) {
            if (s.payees[i] == payee) {
                idx = i;
                break;
            }
        }
        if (idx == type(uint256).max) return 0;

        uint256 entitled =
            (s.totalWithdrawn * s.shares[idx]) / 10000;

        if (entitled <= s.withdrawn[payee]) return 0;
        return entitled - s.withdrawn[payee];
    }

    function markWithdrawn(
        uint256 releaseId,
        address payee,
        uint256 amount
    ) external onlyOwner {
        Split storage s = splits[releaseId];
        s.withdrawn[payee] += amount;
        s.totalWithdrawn += amount;

        emit Withdrawn(releaseId, payee, amount);
    }

    function getSplit(
        uint256 releaseId
    )
        external
        view
        returns (
            address[] memory payees,
            uint256[] memory shares,
            uint256 totalWithdrawn
        )
    {
        Split storage s = splits[releaseId];
        return (s.payees, s.shares, s.totalWithdrawn);
    }
}
