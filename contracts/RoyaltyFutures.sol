// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RoyaltyFutures {

    struct Future {
        address buyer;
        address seller;
        uint256 price;
        uint256 settlementDate;
        bool settled;
    }

    uint256 public futureId;

    mapping(uint256 => Future) public futures;

    function createFuture(
        address seller,
        uint256 price,
        uint256 settlementDate
    ) external payable {

        futureId++;

        futures[futureId] = Future({
            buyer: msg.sender,
            seller: seller,
            price: price,
            settlementDate: settlementDate,
            settled:false
        });

    }

    function settle(uint256 id) external {

        Future storage f = futures[id];

        require(
            block.timestamp >= f.settlementDate,
            "not ready"
        );

        payable(f.seller).transfer(f.price);

        f.settled = true;
    }

}
