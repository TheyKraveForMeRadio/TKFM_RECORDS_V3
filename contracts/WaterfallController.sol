// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20Mintable {
    function mint(address to, uint256 amount) external;
}

contract WaterfallController {

    address public seniorToken;
    address public mezzToken;
    address public equityToken;

    constructor(
        address _senior,
        address _mezz,
        address _equity
    ) {
        seniorToken = _senior;
        mezzToken = _mezz;
        equityToken = _equity;
    }

    function distribute(
        address investor,
        uint256 seniorAmount,
        uint256 mezzAmount,
        uint256 equityAmount
    ) external {

        if (seniorAmount > 0) {
            IERC20Mintable(seniorToken).mint(investor, seniorAmount);
        }

        if (mezzAmount > 0) {
            IERC20Mintable(mezzToken).mint(investor, mezzAmount);
        }

        if (equityAmount > 0) {
            IERC20Mintable(equityToken).mint(investor, equityAmount);
        }
    }
}
