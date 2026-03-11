// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SovereignInvestmentRail {

    struct Deposit {

        address investor;
        uint256 amount;
        uint256 timestamp;

    }

    uint256 public depositId;

    mapping(uint256 => Deposit) public deposits;

    event CapitalDeposited(uint256 id,address investor);

    function depositCapital() external payable {

        depositId++;

        deposits[depositId] = Deposit({

            investor: msg.sender,
            amount: msg.value,
            timestamp: block.timestamp

        });

        emit CapitalDeposited(depositId,msg.sender);

    }

}
