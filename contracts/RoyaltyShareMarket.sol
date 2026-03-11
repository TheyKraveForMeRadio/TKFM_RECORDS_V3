// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoyaltyShareMarket {

    struct Listing {
        address seller;
        address token;
        uint256 amount;
        uint256 price;
    }

    uint256 public listingId;

    mapping(uint256 => Listing) public listings;

    event Listed(uint256 id, address seller);

    function list(
        address token,
        uint256 amount,
        uint256 price
    ) external {

        IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        listingId++;

        listings[listingId] = Listing({
            seller: msg.sender,
            token: token,
            amount: amount,
            price: price
        });

        emit Listed(listingId, msg.sender);
    }

    function buy(uint256 id) external payable {

        Listing storage L = listings[id];

        require(msg.value >= L.price, "price");

        IERC20(L.token).transfer(msg.sender, L.amount);

        payable(L.seller).transfer(msg.value);

        delete listings[id];
    }
}
