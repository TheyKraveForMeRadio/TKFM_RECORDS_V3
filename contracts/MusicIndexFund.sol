// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MusicIndexFund is ERC20 {

 address[] public catalogs;

 constructor()
 ERC20("TKFM Music Index","TKINDEX")
 {}

 function addCatalog(
  address catalog
 ) public {

  catalogs.push(catalog);

 }

 function mint(
  address investor,
  uint amount
 ) public {

  _mint(investor,amount);

 }

}
