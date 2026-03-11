// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltyPool {

    struct Investor {
        uint256 deposited;
    }

    mapping(address => Investor) public investors;

    uint256 public totalDeposits;

    event Deposit(address investor, uint256 amount);

    function deposit() external payable {

        investors[msg.sender].deposited += msg.value;

        totalDeposits += msg.value;

        emit Deposit(msg.sender, msg.value);
    }

}
