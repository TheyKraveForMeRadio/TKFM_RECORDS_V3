// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MusicUSD is ERC20 {

 address public reserve;

 constructor(address _reserve)
 ERC20("Music USD","MUSD") {

  reserve = _reserve;

 }

 function mint(address to,uint amount) external {

  require(msg.sender == reserve);

  _mint(to,amount);

 }

 function burn(address from,uint amount) external {

  require(msg.sender == reserve);

  _burn(from,amount);

 }

}
