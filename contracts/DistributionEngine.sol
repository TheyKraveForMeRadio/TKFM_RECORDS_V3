// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRoyaltyPool {
    function totalDeposits() external view returns(uint256);
}

contract DistributionEngine {

    address public vault;
    address public pool;

    constructor(address _vault, address _pool) {
        vault = _vault;
        pool = _pool;
    }

    function distribute(address payable investor, uint256 share) external {

        uint256 payout = share;

        investor.transfer(payout);
    }
}
