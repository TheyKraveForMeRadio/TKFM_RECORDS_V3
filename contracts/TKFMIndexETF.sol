// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMIndexETF is ERC20, Ownable {

 uint256 public indexValue;

 constructor()
 ERC20("TKFM Music Index ETF","TKFMX")
 {}

 function updateIndexValue(uint256 newValue)
 public
 onlyOwner
 {
  indexValue = newValue;
 }

 function mint(address investor,uint256 amount)
 public
 onlyOwner
 {
  _mint(investor,amount);
 }

}
