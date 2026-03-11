// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CatalogFarm {

    IERC20 public stakingToken;
    IERC20 public rewardToken;

    mapping(address=>uint256) public deposits;

    constructor(address _stake,address _reward){
        stakingToken=IERC20(_stake);
        rewardToken=IERC20(_reward);
    }

    function deposit(uint256 amount) external {

        stakingToken.transferFrom(msg.sender,address(this),amount);

        deposits[msg.sender]+=amount;
    }

    function harvest() external {

        uint256 reward = deposits[msg.sender] / 5;

        rewardToken.transfer(msg.sender,reward);
    }

}
