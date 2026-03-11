// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CrossChainLiquidityRouter {

    struct Route {

        address asset;
        uint256 amount;
        string targetChain;

    }

    uint256 public routeId;

    mapping(uint256 => Route) public routes;

    event Routed(uint256 id);

    function route(

        address asset,
        uint256 amount,
        string calldata chain

    ) external {

        routeId++;

        routes[routeId] = Route({

            asset:asset,
            amount:amount,
            targetChain:chain

        });

        emit Routed(routeId);

    }

}
