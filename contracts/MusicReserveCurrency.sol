// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MusicReserveCurrency is ERC20 {

    address public centralTreasury;

    constructor() ERC20("Global Music Reserve","GMR"){
        centralTreasury = msg.sender;
    }

    function mint(address to,uint256 amount) external {

        require(msg.sender == centralTreasury);

        _mint(to,amount);

    }

    function burn(address from,uint256 amount) external {

        require(msg.sender == centralTreasury);

        _burn(from,amount);

    }

}
