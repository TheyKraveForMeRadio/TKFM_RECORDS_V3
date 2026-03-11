// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TrancheToken is ERC20 {

    address public controller;

    constructor(
        string memory name,
        string memory symbol,
        address _controller
    ) ERC20(name, symbol) {
        controller = _controller;
    }

    function mint(address to, uint256 amount) external {

        require(msg.sender == controller, "Unauthorized");

        _mint(to, amount);
    }
}
