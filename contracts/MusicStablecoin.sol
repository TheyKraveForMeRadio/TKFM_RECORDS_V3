// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MusicStablecoin is ERC20 {

    address public treasury;

    constructor() ERC20("Music Dollar","MUSD") {
        treasury = msg.sender;
    }

    function mint(address to,uint256 amount) external {

        require(msg.sender == treasury);

        _mint(to,amount);

    }

    function burn(address from,uint256 amount) external {

        require(msg.sender == treasury);

        _burn(from,amount);

    }

}
