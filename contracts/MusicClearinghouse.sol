// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicClearinghouse {

    struct Trade {

        address buyer;
        address seller;
        address token;
        uint256 amount;
        uint256 price;
        bool settled;

    }

    uint256 public tradeId;

    mapping(uint256 => Trade) public trades;

    event TradeRecorded(uint256 id);
    event TradeSettled(uint256 id);

    function recordTrade(

        address buyer,
        address seller,
        address token,
        uint256 amount,
        uint256 price

    ) external {

        tradeId++;

        trades[tradeId] = Trade(
            buyer,
            seller,
            token,
            amount,
            price,
            false
        );

        emit TradeRecorded(tradeId);
    }

    function settleTrade(uint256 id) external {

        Trade storage t = trades[id];

        require(!t.settled,"already settled");

        payable(t.seller).transfer(t.price);

        t.settled = true;

        emit TradeSettled(id);

    }

}
