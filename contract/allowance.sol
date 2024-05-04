// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AllowanceContract {
    address public providerAddress;
    address public walletAddress;
    uint public allowanceAmount;
    uint public startdate;
    uint public enddate;
    uint public allowanceSpent;
    string public name;

    function initialize(
        address _providerAddress,
        address _walletAddress,
        uint _amount,
        uint _startdate,
        uint _enddate,
        string memory _rName
    ) external {
        providerAddress = _providerAddress;
        walletAddress = _walletAddress;
        allowanceAmount = _amount;
        startdate = _startdate;
        enddate = _enddate;
        allowanceSpent = 0;
        name = _rName;
    }

    function Transact(uint _txnAmount) external {
        require(
            block.timestamp >= startdate && block.timestamp <= enddate,
            "Transaction not allowed outside allowance period"
        );
        require(
            _txnAmount <= (allowanceAmount - allowanceSpent),
            "Transaction amount exceeds remaining allowance"
        );

        allowanceSpent += _txnAmount;
    }
}
