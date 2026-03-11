// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Clearinghouse {

 mapping(address => uint) public balances;

 function deposit() public payable {
  balances[msg.sender] += msg.value;
 }

 function settle(
  address trader,
  uint amount
 ) public {

  require(
   balances[trader] >= amount
  );

  balances[trader] -= amount;

  payable(trader).transfer(amount);

 }

}
