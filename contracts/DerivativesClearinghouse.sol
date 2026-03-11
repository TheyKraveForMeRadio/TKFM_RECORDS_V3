// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract DerivativesClearinghouse {

    struct Position {

        address trader;
        address asset;
        uint256 size;
        uint256 margin;

    }

    uint256 public positionId;

    mapping(uint256 => Position) public positions;

    function openPosition(

        address asset,
        uint256 size

    ) external payable {

        positionId++;

        positions[positionId] = Position({

            trader: msg.sender,
            asset: asset,
            size: size,
            margin: msg.value

        });

    }

}
