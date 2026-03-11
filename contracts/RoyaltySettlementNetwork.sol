// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltySettlementNetwork {

    struct Payment {

        address recipient;
        uint256 amount;
        uint256 timestamp;

    }

    uint256 public paymentId;

    mapping(uint256 => Payment) public payments;

    event RoyaltyPaid(address artist,uint256 amount);

    function settle(address recipient) external payable {

        paymentId++;

        payments[paymentId] = Payment({

            recipient: recipient,
            amount: msg.value,
            timestamp: block.timestamp

        });

        payable(recipient).transfer(msg.value);

        emit RoyaltyPaid(recipient,msg.value);

    }

}
