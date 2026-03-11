// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMCatalogToken is ERC20, Ownable {

    string public catalogId;
    uint256 public totalRoyaltyShares;

    mapping(address => uint256) public investorShares;

    event SharesMinted(address investor, uint256 amount);
    event SharesBurned(address investor, uint256 amount);

    constructor(
        string memory _catalogId,
        string memory name_,
        string memory symbol_,
        uint256 initialSupply
    ) ERC20(name_, symbol_) {

        catalogId = _catalogId;

        _mint(msg.sender, initialSupply);

        totalRoyaltyShares = initialSupply;

        investorShares[msg.sender] = initialSupply;

    }

    function mintShares(address investor, uint256 amount)
        public
        onlyOwner
    {

        _mint(investor, amount);

        investorShares[investor] += amount;

        totalRoyaltyShares += amount;

        emit SharesMinted(investor, amount);

    }

    function burnShares(address investor, uint256 amount)
        public
        onlyOwner
    {

        _burn(investor, amount);

        investorShares[investor] -= amount;

        totalRoyaltyShares -= amount;

        emit SharesBurned(investor, amount);

    }

    function royaltyShare(address investor)
        public
        view
        returns (uint256)
    {

        return (investorShares[investor] * 1e18) / totalRoyaltyShares;

    }

}
