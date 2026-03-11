// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltyDerivativesExchange {

    struct Contract {

        address trader;
        address underlying;
        uint256 strike;
        uint256 expiry;
        bool isCall;
        bool exercised;

    }

    uint256 public contractId;

    mapping(uint256 => Contract) public contracts;

    event Created(uint256 id);

    function createContract(
        address token,
        uint256 strike,
        uint256 expiry,
        bool isCall
    ) external {

        contractId++;

        contracts[contractId] = Contract({

            trader: msg.sender,
            underlying: token,
            strike: strike,
            expiry: expiry,
            isCall: isCall,
            exercised:false

        });

        emit Created(contractId);

    }

    function exercise(uint256 id) external {

        Contract storage c = contracts[id];

        require(block.timestamp >= c.expiry,"not expired");

        c.exercised = true;

    }

}
