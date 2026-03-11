// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoyaltyOrderBook {

    struct Order {
        address trader;
        address token;
        uint256 amount;
        uint256 price;
        bool buy;
    }

    uint256 public orderId;

    mapping(uint256 => Order) public orders;

    event OrderPlaced(uint256 id,address trader);

    function placeOrder(
        address token,
        uint256 amount,
        uint256 price,
        bool buy
    ) external {

        orderId++;

        orders[orderId] = Order({
            trader: msg.sender,
            token: token,
            amount: amount,
            price: price,
            buy: buy
        });

        emit OrderPlaced(orderId,msg.sender);
    }

    function fill(uint256 id) external payable {

        Order storage o = orders[id];

        if(o.buy){
            IERC20(o.token).transferFrom(
                msg.sender,
                o.trader,
                o.amount
            );
        } else {
            IERC20(o.token).transfer(
                msg.sender,
                o.amount
            );
        }

        delete orders[id];
    }

}
