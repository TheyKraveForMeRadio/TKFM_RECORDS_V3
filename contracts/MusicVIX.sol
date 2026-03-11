// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MusicVIX {

 uint public volatility;

 function updateVolatility(
  uint value
 ) public {

  volatility = value;

 }

 function getVolatility()
 public view
 returns(uint){

  return volatility;

 }

}
