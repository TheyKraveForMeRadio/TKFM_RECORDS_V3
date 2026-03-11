// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoyaltySettlement {

    struct Pool {

        address token;
        uint256 totalShares;

    }

    mapping(address => uint256) public shares;

    address public royaltyToken;

    constructor(address token){
        royaltyToken = token;
    }

    function depositRevenue(uint256 amount) external {

        IERC20(royaltyToken)
        .transferFrom(msg.sender,address(this),amount);

    }

    function claim() external {

        uint256 reward = shares[msg.sender];

        IERC20(royaltyToken)
        .transfer(msg.sender,reward);

    }

}
