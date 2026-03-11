// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StreamingRevenueBond {

    struct Bond {

        address issuer;
        uint256 principal;
        uint256 interest;
        uint256 maturity;
        bool repaid;

    }

    uint256 public bondId;

    mapping(uint256 => Bond) public bonds;

    event Issued(uint256 id);

    function issueBond(

        uint256 principal,
        uint256 interest,
        uint256 maturity

    ) external {

        bondId++;

        bonds[bondId] = Bond({

            issuer: msg.sender,
            principal: principal,
            interest: interest,
            maturity: maturity,
            repaid:false

        });

        emit Issued(bondId);

    }

}
