// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NOT_AUTHORITY();
error MINTING_LOCKED();

contract TKFMToken is ERC20, Ownable {
    address public authority;
    bool public mintingLocked;

    modifier onlyAuthority() {
        if (msg.sender != authority) revert NOT_AUTHORITY();
        _;
    }

    modifier mintingAllowed() {
        if (mintingLocked) revert MINTING_LOCKED();
        _;
    }

    constructor(address initialAuthority) ERC20("TKFM Token", "TKFMT") {
        authority = initialAuthority;
        _mint(initialAuthority, 1_000_000 * 10 ** decimals());
        mintingLocked = true; // start locked by default
    }

    function lockMinting() external onlyAuthority {
        mintingLocked = true;
    }

    function unlockMinting() external onlyAuthority {
        mintingLocked = false;
    }

    // Corrected transfer override: public + override
    function transfer(address to, uint256 amount) public override mintingAllowed returns (bool) {
        return super.transfer(to, amount);
    }

    function transferAuthority(address newAuthority) external onlyOwner {
        authority = newAuthority;
    }
}
