// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MusicReserveTreasury {

    address public governor;

    mapping(address => uint256) public reserves;

    event ReserveAdded(address asset,uint256 amount);
    event ReserveWithdrawn(address asset,uint256 amount);

    constructor(){
        governor = msg.sender;
    }

    function depositReserve(address token,uint256 amount) external {

        IERC20(token).transferFrom(msg.sender,address(this),amount);

        reserves[token] += amount;

        emit ReserveAdded(token,amount);
    }

    function withdrawReserve(address token,uint256 amount) external {

        require(msg.sender == governor,"not governor");

        reserves[token] -= amount;

        IERC20(token).transfer(msg.sender,amount);

        emit ReserveWithdrawn(token,amount);
    }

}
