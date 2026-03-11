// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SettlementMirror {

    event SettlementAnchored(
        bytes32 indexed hash,
        uint256 timestamp
    );

    function anchor(bytes32 hash) external {
        emit SettlementAnchored(hash, block.timestamp);
    }
}
