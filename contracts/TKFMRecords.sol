// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./TKFMToken.sol";

contract TKFMRecords is Ownable {
    TKFMToken public token;

    constructor(address tokenAddress) {
        token = TKFMToken(tokenAddress);
    }

    function lockTokenMinting() external onlyOwner {
        token.lockMinting();
    }
}
