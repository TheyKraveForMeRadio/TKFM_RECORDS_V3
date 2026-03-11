// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract RoyaltyIndexFund is ERC20 {

    address[] public catalogTokens;

    constructor(address[] memory _tokens)
    ERC20("TKFM Royalty Index","TKFMI"){
        catalogTokens = _tokens;
    }

    function deposit(uint256 amount) external {

        for(uint i=0;i<catalogTokens.length;i++){

            IERC20(catalogTokens[i]).transferFrom(
                msg.sender,
                address(this),
                amount
            );

        }

        _mint(msg.sender, amount);

    }

    function catalogs() external view returns(address[] memory){
        return catalogTokens;
    }

}
