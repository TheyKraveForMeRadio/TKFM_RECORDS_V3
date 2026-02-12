// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TKFMToken is ERC1155, Ownable {
    uint256 public constant AI_DROP_25 = 1;
    uint256 public constant SPONSOR_READ_20PACK = 2;
    uint256 public constant RADIO_PLAY = 3;

    constructor() ERC1155("https://tkfm-records.com/metadata/{id}.json") {}

    function mint(address to, uint256 id, uint256 amount) external onlyOwner {
        _mint(to, id, amount, "");
    }

    function batchMint(address to, uint256[] memory ids, uint256[] memory amounts) external onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }
}
