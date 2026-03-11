// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PoolDAO {

    IERC20 public governanceToken;

    struct Proposal {
        string description;
        uint256 votes;
        uint256 end;
        bool executed;
    }

    uint256 public proposalCount;

    mapping(uint256 => Proposal) public proposals;

    mapping(uint256 => mapping(address=>bool)) public voted;

    constructor(address token){
        governanceToken = IERC20(token);
    }

    function propose(string memory desc) external {

        proposalCount++;

        proposals[proposalCount] = Proposal({
            description: desc,
            votes:0,
            end:block.timestamp+3 days,
            executed:false
        });
    }

    function vote(uint256 id) external {

        require(!voted[id][msg.sender],"voted");

        uint weight = governanceToken.balanceOf(msg.sender);

        proposals[id].votes += weight;

        voted[id][msg.sender]=true;
    }

}
