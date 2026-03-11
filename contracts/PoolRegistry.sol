// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract PoolRegistry {

    struct Pool {
        address creator;
        string metadataURI;
        uint256 createdAt;
    }

    uint256 public poolCount;

    mapping(uint256 => Pool) public pools;

    event PoolCreated(
        uint256 poolId,
        address creator,
        string metadataURI
    );

    function createPool(string memory metadataURI) external returns (uint256) {

        poolCount++;

        pools[poolCount] = Pool({
            creator: msg.sender,
            metadataURI: metadataURI,
            createdAt: block.timestamp
        });

        emit PoolCreated(poolCount, msg.sender, metadataURI);

        return poolCount;
    }

}
