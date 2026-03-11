// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LiquidityMining {

    IERC20 public rewardToken;
    IERC20 public lpToken;

    mapping(address=>uint256) public stakes;

    constructor(address _reward,address _lp){
        rewardToken=IERC20(_reward);
        lpToken=IERC20(_lp);
    }

    function stake(uint256 amount) external {

        lpToken.transferFrom(msg.sender,address(this),amount);

        stakes[msg.sender]+=amount;
    }

    function claim() external {

        uint256 reward = stakes[msg.sender] / 10;

        rewardToken.transfer(msg.sender,reward);
    }

}
