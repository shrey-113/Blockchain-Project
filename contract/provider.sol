// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProviderContract {
    address public providerWallet;
    uint256 public noOfBenefactors;
    struct Transaction {
        uint amount;
        address recipient;
        uint timestamp;
        string behalf;
    }

    struct Allowance {
        address providerAddress;
        address walletAddress;
        uint allowanceAmount;
        uint startdate;
        uint enddate;
        uint allowanceSpent;
        string name;
    }

    struct Benefactor {
        address walletAddress;
        string name;
    }

    receive() external payable {}

    fallback() external payable {}

    Transaction[] public transactions;
    Allowance[] public allowances;

    mapping(address => string) benefactors;

    uint256 public totalAllowance;

    function initialize(address _providerWallet) external {
        providerWallet = _providerWallet;
        noOfBenefactors = 0;
        totalAllowance = 0;
    }

    function addAllowance(
        address _walletAddress,
        uint _allowanceAmount,
        uint _startdate,
        uint _enddate,
        string memory _name
    ) external {
        // Check if the wallet address is not present in benefactors mapping
        if (bytes(benefactors[_walletAddress]).length == 0) {
            // Increment the noOfBenefactors variable
            noOfBenefactors++;
            // Add the address => name mapping to the benefactors
            benefactors[_walletAddress] = _name;
        }

        totalAllowance += _allowanceAmount;

        // Push the Allowance struct into the allowances array
        allowances.push(
            Allowance({
                providerAddress: providerWallet,
                walletAddress: _walletAddress,
                allowanceAmount: _allowanceAmount,
                startdate: _startdate,
                enddate: _enddate,
                name: _name,
                allowanceSpent: 0
            })
        );
    }

    function Transact(
        address _recipient,
        uint _amount,
        address _benefactorAddress
    ) external payable {
        string memory behalfName = benefactors[_benefactorAddress];

        // Create a new transaction
        Transaction memory newTransaction = Transaction({
            amount: _amount,
            recipient: _recipient,
            timestamp: block.timestamp,
            behalf: behalfName
        });

        // Push the transaction into the transactions array
        transactions.push(newTransaction);

        // Find the corresponding allowance
        for (uint i = 0; i < allowances.length; i++) {
            if (allowances[i].walletAddress == _recipient) {
                // Update the allowance spent
                allowances[i].allowanceSpent += _amount;
                break;
            }
        }

        address _recipientaddress = _recipient;

        bytes memory rand;
        (bool sent, bytes memory data) = payable(_recipientaddress).call{
            value: _amount
        }("");
        require(sent, "Failed to send Ether");
        rand = data;
    }

    function getProviderData()
        external
        view
        returns (
            uint256,
            Benefactor[] memory,
            Allowance[] memory,
            Transaction[] memory
        )
    {
        // Return the data of the ProviderContract
        return (noOfBenefactors, getAllBenefactors(), allowances, transactions);
    }

    function getAllBenefactors() internal view returns (Benefactor[] memory) {
        Benefactor[] memory benefactorsData = new Benefactor[](noOfBenefactors);
        for (uint256 i = 0; i < noOfBenefactors; i++) {
            address walletAddress = allowances[i].walletAddress;
            string memory name = benefactors[walletAddress];
            benefactorsData[i] = Benefactor(walletAddress, name);
        }
        return benefactorsData;
    }
}
