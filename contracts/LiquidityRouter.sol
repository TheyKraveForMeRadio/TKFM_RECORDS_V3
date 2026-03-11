// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IUniswapRouter {

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (
        uint amountToken,
        uint amountETH,
        uint liquidity
    );
}

contract LiquidityRouter {

    address public router;

    constructor(address _router){
        router = _router;
    }

    function provideLiquidity(
        address token,
        uint tokenAmount
    ) external payable {

        IUniswapRouter(router).addLiquidityETH{
            value: msg.value
        }(
            token,
            tokenAmount,
            0,
            0,
            msg.sender,
            block.timestamp
        );
    }
}
