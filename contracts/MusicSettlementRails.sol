// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicSettlementRails {

    struct Settlement {

        address from;
        address to;
        uint256 amount;
        uint256 timestamp;

    }

    uint256 public settlementId;

    mapping(uint256 => Settlement) public settlements;

    event Settled(uint256 id);

    function settle(address to) external payable {

        settlementId++;

        settlements[settlementId] = Settlement({

            from: msg.sender,
            to: to,
            amount: msg.value,
            timestamp: block.timestamp

        });

        payable(to).transfer(msg.value);

        emit Settled(settlementId);

    }

}
