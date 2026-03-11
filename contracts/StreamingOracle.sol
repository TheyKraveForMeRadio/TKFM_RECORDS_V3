// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StreamingOracle {

    address public oracle;

    mapping(address => uint256) public catalogStreams;

    event StreamsUpdated(address catalog,uint256 streams);

    constructor(){
        oracle = msg.sender;
    }

    function updateStreams(

        address catalog,
        uint256 streams

    ) external {

        require(msg.sender == oracle,"not oracle");

        catalogStreams[catalog] = streams;

        emit StreamsUpdated(catalog,streams);

    }

}
