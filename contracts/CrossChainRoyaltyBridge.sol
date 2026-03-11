// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CrossChainRoyaltyBridge {

    address public validator;

    event Locked(
        address token,
        address user,
        uint256 amount,
        string targetChain
    );

    event Unlocked(
        address token,
        address user,
        uint256 amount
    );

    constructor(){
        validator = msg.sender;
    }

    function lock(
        address token,
        uint256 amount,
        string calldata targetChain
    ) external {

        IERC20(token).transferFrom(
            msg.sender,
            address(this),
            amount
        );

        emit Locked(token,msg.sender,amount,targetChain);
    }

    function unlock(
        address token,
        address user,
        uint256 amount
    ) external {

        require(msg.sender == validator);

        IERC20(token).transfer(user,amount);

        emit Unlocked(token,user,amount);
    }

}
