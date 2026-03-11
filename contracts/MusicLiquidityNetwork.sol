// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicLiquidityNetwork {

    struct Pool {

        address asset;
        uint256 liquidity;
        string chain;

    }

    uint256 public poolId;

    mapping(uint256 => Pool) public pools;

    event PoolRegistered(uint256 id);

    function registerPool(

        address asset,
        uint256 liquidity,
        string calldata chain

    ) external {

        poolId++;

        pools[poolId] = Pool({

            asset:asset,
            liquidity:liquidity,
            chain:chain

        });

        emit PoolRegistered(poolId);

    }

}
