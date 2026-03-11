// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StreamingDerivatives {

 struct Contract {

  address trader;

  string track;

  uint strikeStreams;

  uint expiry;

 }

 Contract[] public contracts;

 function createDerivative(

  string memory track,

  uint strike,

  uint expiry

 ) public {

  contracts.push(

   Contract(

    msg.sender,

    track,

    strike,

    expiry

   )

  );

 }

 function getContracts()

 public view

 returns(Contract[] memory){

  return contracts;

 }

}
