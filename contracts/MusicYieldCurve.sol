// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicYieldCurve {

    struct CurvePoint {

        uint256 maturity;
        uint256 yieldRate;

    }

    mapping(uint256 => CurvePoint) public curve;

    address public admin;

    constructor(){
        admin = msg.sender;
    }

    function updatePoint(
        uint256 maturity,
        uint256 yieldRate
    ) external {

        require(msg.sender == admin);

        curve[maturity] = CurvePoint({
            maturity:maturity,
            yieldRate:yieldRate
        });

    }

}
