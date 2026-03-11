// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicReserveBank {

 uint public totalReserves;

 mapping(address => uint) public labelDeposits;

 function depositReserve() external payable {

  totalReserves += msg.value;

  labelDeposits[msg.sender] += msg.value;

 }

 function withdrawReserve(uint amount) external {

  require(labelDeposits[msg.sender] >= amount);

  labelDeposits[msg.sender] -= amount;

  totalReserves -= amount;

  payable(msg.sender).transfer(amount);

 }

}
