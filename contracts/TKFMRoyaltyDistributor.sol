// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TKFMRoyaltyDistributor {

    IERC20 public royaltyToken;

    uint256 public totalDistributed;

    mapping(address => uint256) public claimed;

    event RevenueDeposited(uint256 amount);
    event RevenueClaimed(address investor, uint256 amount);

    constructor(address tokenAddress){
        royaltyToken = IERC20(tokenAddress);
    }

    receive() external payable {
        totalDistributed += msg.value;
        emit RevenueDeposited(msg.value);
    }

    function claimRevenue() public {

        uint256 holderBalance = royaltyToken.balanceOf(msg.sender);

        require(holderBalance > 0, "No tokens owned");

        uint256 supply = royaltyToken.totalSupply();

        uint256 entitled = (totalDistributed * holderBalance) / supply;

        uint256 payableAmount = entitled - claimed[msg.sender];

        require(payableAmount > 0, "Nothing to claim");

        claimed[msg.sender] += payableAmount;

        payable(msg.sender).transfer(payableAmount);

        emit RevenueClaimed(msg.sender, payableAmount);

    }

}
