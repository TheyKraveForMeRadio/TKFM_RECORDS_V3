// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RevenueSwapMarket {

    struct Swap {

        address buyer;
        address seller;
        uint256 notional;
        uint256 maturity;
        bool active;

    }

    uint256 public swapId;

    mapping(uint256 => Swap) public swaps;

    function createSwap(

        address seller,
        uint256 notional,
        uint256 maturity

    ) external {

        swapId++;

        swaps[swapId] = Swap({

            buyer: msg.sender,
            seller: seller,
            notional: notional,
            maturity: maturity,
            active:true

        });

    }

}
