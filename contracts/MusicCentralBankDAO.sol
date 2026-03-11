// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicCentralBankDAO {

    struct Proposal {
        address proposer;
        string description;
        uint256 votes;
        bool executed;
    }

    uint256 public proposalId;

    mapping(uint256 => Proposal) public proposals;

    mapping(address => bool) public voters;

    event ProposalCreated(uint256 id);
    event Voted(uint256 id,address voter);

    function createProposal(string memory desc) external {

        proposalId++;

        proposals[proposalId] = Proposal({
            proposer:msg.sender,
            description:desc,
            votes:0,
            executed:false
        });

        emit ProposalCreated(proposalId);
    }

    function vote(uint256 id) external {

        require(!voters[msg.sender],"already voted");

        proposals[id].votes++;

        voters[msg.sender] = true;

        emit Voted(id,msg.sender);
    }

}
