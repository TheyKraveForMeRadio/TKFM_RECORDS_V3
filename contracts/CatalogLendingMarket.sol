// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CatalogLendingMarket {

    struct Loan {

        address borrower;
        uint256 collateral;
        uint256 loanAmount;
        bool active;

    }

    uint256 public loanId;

    mapping(uint256 => Loan) public loans;

    function requestLoan(uint256 collateral,uint256 loanAmount) external {

        loanId++;

        loans[loanId] = Loan({

            borrower:msg.sender,
            collateral:collateral,
            loanAmount:loanAmount,
            active:true

        });

    }

    function fundLoan(uint256 id) external payable {

        Loan storage L = loans[id];

        require(msg.value == L.loanAmount);

        payable(L.borrower).transfer(msg.value);

    }

}
