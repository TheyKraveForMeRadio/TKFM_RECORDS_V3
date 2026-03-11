// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicCreditRating {

    address public admin;

    mapping(address => uint8) public ratings;

    event RatingUpdated(address catalog,uint8 rating);

    constructor(){
        admin = msg.sender;
    }

    function updateRating(

        address catalog,
        uint8 rating

    ) external {

        require(msg.sender == admin);

        ratings[catalog] = rating;

        emit RatingUpdated(catalog,rating);

    }

}
