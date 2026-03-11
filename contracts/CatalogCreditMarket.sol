// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CatalogCreditMarket {

    struct Loan {
        address borrower;
        uint256 amount;
        uint256 interest;
        bool repaid;
    }

    uint256 public loanId;

    mapping(uint256 => Loan) public loans;

    function requestLoan(uint256 amount,uint256 interest) external {

        loanId++;

        loans[loanId] = Loan({
            borrower: msg.sender,
            amount: amount,
            interest: interest,
            repaid:false
        });

    }

    function fundLoan(uint256 id) external payable {

        Loan storage L = loans[id];

        require(msg.value == L.amount);

        payable(L.borrower).transfer(msg.value);
    }

    function repay(uint256 id) external payable {

        Loan storage L = loans[id];

        require(msg.value >= L.amount + L.interest);

        L.repaid = true;
    }

}
