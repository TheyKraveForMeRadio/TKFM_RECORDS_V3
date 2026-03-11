// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {

 function transferFrom(
  address,
  address,
  uint
 ) external returns(bool);

 function transfer(
  address,
  uint
 ) external returns(bool);

}

contract RoyaltyAMM {

 uint public reserveA;
 uint public reserveB;

 address public tokenA;
 address public tokenB;

 constructor(
  address _a,
  address _b
 ){

  tokenA = _a;
  tokenB = _b;

 }

 function addLiquidity(
  uint a,
  uint b
 ) public {

  IERC20(tokenA)
  .transferFrom(msg.sender,address(this),a);

  IERC20(tokenB)
  .transferFrom(msg.sender,address(this),b);

  reserveA += a;
  reserveB += b;

 }

 function swapAforB(uint amount) public {

  uint output =
  (amount * reserveB) /
  (reserveA + amount);

  IERC20(tokenA)
  .transferFrom(msg.sender,address(this),amount);

  IERC20(tokenB)
  .transfer(msg.sender,output);

  reserveA += amount;
  reserveB -= output;

 }

}
