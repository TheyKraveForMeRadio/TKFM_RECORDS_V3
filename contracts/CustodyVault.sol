// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CustodyVault {

    address public custodian;

    mapping(address=>uint256) public balances;

    constructor(){
        custodian = msg.sender;
    }

    function deposit(address token,uint256 amount) external {

        IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        balances[msg.sender]+=amount;
    }

    function withdraw(address token,uint256 amount) external {

        require(
            balances[msg.sender] >= amount,
            "balance"
        );

        balances[msg.sender]-=amount;

        IERC20(token).transfer(
            msg.sender,
            amount
        );
    }

}
