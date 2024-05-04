// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./provider.sol";
import "./allowance.sol";

contract MainContract {
    struct Receivers {
        address ProviderAddress;
        address contractAddress;
    }

    bytes rand;

    mapping(address => address) public providers;
    mapping(address => Receivers) public receivers;

    event ProviderRegistered(
        address indexed providerAddress,
        address providerContractAddress
    );
    event AllowanceRegistered(
        address indexed providerAddress,
        address indexed walletAddress,
        address allowanceContractAddress
    );
    event Transaction(
        address indexed recipientAddress,
        uint256 amount,
        address indexed behalfAddress,
        address providerAddress,
        address allowanceContractAddress
    );
    event ProviderDataReturned(
        uint256 id,
        ProviderContract.Benefactor[] benefactors,
        ProviderContract.Allowance[] allowances,
        ProviderContract.Transaction[] transactions
    );
    event ProviderContractAddressReturned(
        address indexed providerAddress,
        address contractAddress
    );
    event ProviderContractAddressForReceiverReturned(
        address indexed receiverAddress,
        address contractAddress
    );
    event MessageEvent(string message);

    function RegisterProvider(address _providerWallet) external {
        ProviderContract newProvider = new ProviderContract();
        newProvider.initialize(_providerWallet);
        providers[_providerWallet] = address(newProvider);

        emit ProviderRegistered(_providerWallet, address(newProvider));
    }

    function RegisterAllowance(
        address _providerAddress,
        address _walletAddress,
        uint _amount,
        uint _startdate,
        uint _enddate,
        string memory _rName
    ) external payable {
        require(msg.value > 0, "Amount must be greater than zero");

        address providerContractAddress = providers[_providerAddress];
        require(
            providerContractAddress != address(0),
            "Provider contract not found"
        );

        AllowanceContract newAllowance = new AllowanceContract();
        newAllowance.initialize(
            _providerAddress,
            _walletAddress,
            _amount,
            _startdate,
            _enddate,
            _rName
        );

        ProviderContract providerContractInstance = ProviderContract(
            payable(providerContractAddress)
        );

        (bool sent, bytes memory data) = payable(providerContractAddress).call{
            value: msg.value
        }("");
        require(sent, "Failed to send Ether");
        rand = data;

        // Call the addAllowance function of the ProviderContract instance
        providerContractInstance.addAllowance(
            _walletAddress,
            _amount,
            _startdate,
            _enddate,
            _rName
        );

        receivers[_walletAddress] = Receivers({
            ProviderAddress: _providerAddress,
            contractAddress: address(newAllowance)
        });

        emit AllowanceRegistered(
            _providerAddress,
            _walletAddress,
            address(newAllowance)
        );
    }

    function Transact(
        address _recipientAddress,
        uint256 _amount,
        address _behalfAddress
    ) external {
        // Get the ProviderAddress and contractAddress using the _behalfAddress
        Receivers memory receiver = receivers[_behalfAddress];
        address providerAddress = receiver.ProviderAddress;
        address allowanceContractAddress = receiver.contractAddress;

        // Ensure that the receiver's contractAddress is valid
        require(
            allowanceContractAddress != address(0),
            "Allowance contract not found"
        );

        // Cast the contract addresses to their respective contract types
        ProviderContract providerContractInstance = ProviderContract(
            payable(providerAddress)
        );
        AllowanceContract allowanceContractInstance = AllowanceContract(
            allowanceContractAddress
        );

        // Call the Transact function of the AllowanceContract
        allowanceContractInstance.Transact(_amount);

        // Call the Transact function of the ProviderContract to make the payment
        providerContractInstance.Transact(
            _recipientAddress,
            _amount,
            _behalfAddress
        );

        emit Transaction(
            _recipientAddress,
            _amount,
            _behalfAddress,
            providerAddress,
            allowanceContractAddress
        );
    }

    function getProviderData(
        address _providerAddress
    )
        external
        returns (
            uint256 id,
            ProviderContract.Benefactor[] memory benefactors,
            ProviderContract.Allowance[] memory allowances,
            ProviderContract.Transaction[] memory transactions
        )
    {
        address providerContractAddress = providers[_providerAddress];
        if (providerContractAddress == address(0)) {
            emit MessageEvent("Provider Contract address doesn't exist!");
        } else {
            ProviderContract providerContractInstance = ProviderContract(
                payable(providerContractAddress)
            );
            (
                id,
                benefactors,
                allowances,
                transactions
            ) = providerContractInstance.getProviderData();
            emit ProviderDataReturned(
                id,
                benefactors,
                allowances,
                transactions
            );
        }
    }

    function getProviderContractAddress(
        address _providerAddress
    ) external returns (address contractAddress) {
        // Retrieve the contract address from the mapping
        address providerContractAddress = providers[_providerAddress];

        emit ProviderContractAddressReturned(
            _providerAddress,
            providerContractAddress
        );

        return providerContractAddress;
    }

    function getProviderContractAddressForReciever(
        address _recieverAddress
    ) external returns (address contractAddress) {
        Receivers memory reciever = receivers[_recieverAddress];
        address providerAdd = reciever.ProviderAddress;

        address providerContractAddress = providers[providerAdd];

        emit ProviderContractAddressForReceiverReturned(
            _recieverAddress,
            providerContractAddress
        );

        return providerContractAddress;
    }
}
