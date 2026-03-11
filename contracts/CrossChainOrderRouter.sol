// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrossChainOrderRouter {

    event OrderRouted(
        address trader,
        string targetChain,
        address token,
        uint256 amount
    );

    function routeOrder(

        string calldata chain,
        address token,
        uint256 amount

    ) external {

        emit OrderRouted(

            msg.sender,
            chain,
            token,
            amount

        );

    }

}
