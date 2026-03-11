// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TKFMStreamingOracle {

 mapping(uint256 => uint256) public catalogRevenue;

 function reportRevenue(
  uint256 catalogId,
  uint256 amount
 ) public {

  catalogRevenue[catalogId] += amount;

 }

}
