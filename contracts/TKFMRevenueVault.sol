// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract TKFMRevenueVault {
    // Simple vault storage for deposits
    struct Deposit {
        uint256 releaseId;
        address[] payees;
        uint256[] amounts;
        uint256[] shares; // basis points
    }

    mapping(uint256 => Deposit[]) public deposits; // releaseId => deposits

    event RevenueDeposited(
        uint256 indexed releaseId,
        address[] payees,
        uint256[] amounts,
        uint256[] shares
    );

    /// @notice Deposit revenue for a release
    /// @param releaseId The ID of the release
    /// @param amounts Array of amounts to deposit per payee
    /// @param payees Array of payee addresses
    /// @param shares Array of shares in basis points
    function deposit(
        uint256 releaseId,
        uint256[] memory amounts,
        address[] memory payees,
        uint256[] memory shares
    ) external {
        require(amounts.length == payees.length && payees.length == shares.length, "Array length mismatch");

        deposits[releaseId].push(Deposit({
            releaseId: releaseId,
            payees: payees,
            amounts: amounts,
            shares: shares
        }));

        emit RevenueDeposited(releaseId, payees, amounts, shares);
    }

    /// @notice Get deposits for a release
    function getDeposits(uint256 releaseId) external view returns (Deposit[] memory) {
        return deposits[releaseId];
    }
}
