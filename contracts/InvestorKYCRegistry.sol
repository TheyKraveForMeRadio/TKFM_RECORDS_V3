// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvestorKYCRegistry {

    address public admin;

    mapping(address => bool) public verified;

    event InvestorVerified(address investor);
    event InvestorRevoked(address investor);

    constructor() {
        admin = msg.sender;
    }

    function verifyInvestor(address investor) external {

        require(msg.sender == admin,"not admin");

        verified[investor] = true;

        emit InvestorVerified(investor);
    }

    function revokeInvestor(address investor) external {

        require(msg.sender == admin,"not admin");

        verified[investor] = false;

        emit InvestorRevoked(investor);
    }

    function isVerified(address investor)
        external
        view
        returns(bool)
    {
        return verified[investor];
    }

}
