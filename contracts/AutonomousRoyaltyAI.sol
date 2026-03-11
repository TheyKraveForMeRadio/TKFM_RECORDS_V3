// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AutonomousRoyaltyAI {

    struct ArtistShare {

        address artist;
        uint256 percentage;

    }

    mapping(address => ArtistShare[]) public catalogShares;

    function registerShare(

        address catalog,
        address artist,
        uint256 pct

    ) external {

        catalogShares[catalog].push(
            ArtistShare(artist,pct)
        );

    }

    function distribute(address catalog) external payable {

        ArtistShare[] storage s = catalogShares[catalog];

        for(uint i=0;i<s.length;i++){

            uint256 payout =
            msg.value * s[i].percentage / 100;

            payable(s[i].artist).transfer(payout);

        }

    }

}
