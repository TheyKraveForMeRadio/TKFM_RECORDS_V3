// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMToken is ERC20, Ownable {
    bool public mintingLocked = true;

    constructor() ERC20("TKFM Token", "TKFMT") {
        _mint(msg.sender, 1000000 * 10 ** decimals()); // initial supply to deployer
    }

    function setMintingLocked(bool locked) external onlyOwner {
        mintingLocked = locked;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(!mintingLocked, "Minting locked");
        _mint(to, amount);
    }
}
