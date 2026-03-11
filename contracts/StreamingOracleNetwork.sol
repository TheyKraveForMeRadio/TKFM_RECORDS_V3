// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StreamingOracleNetwork {

    struct Submission {

        address node;
        address catalog;
        uint256 streams;

    }

    mapping(address => bool) public oracleNodes;

    mapping(address => uint256) public catalogStreams;

    address public admin;

    constructor(){
        admin = msg.sender;
    }

    function addNode(address node) external {

        require(msg.sender == admin);

        oracleNodes[node] = true;

    }

    function submitStreams(

        address catalog,
        uint256 streams

    ) external {

        require(oracleNodes[msg.sender],"not node");

        catalogStreams[catalog] += streams;

    }

}
