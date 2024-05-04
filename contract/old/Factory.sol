// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./allowance.sol";

contract FactoryContract {
    event ContractCreated(address indexed creator, address contractAddr);

    function deployChildContract(
        address[] memory _recipients,
        uint[] memory _amounts,
        uint[] memory _startTimes,
        uint[] memory _endTimes,
        string[] memory _recipientNames
    ) public {
        require(
            _recipients.length == _amounts.length &&
                _recipients.length == _startTimes.length &&
                _recipients.length == _endTimes.length &&
                _recipients.length == _recipientNames.length,
            "Arrays length mismatch"
        );

        for (uint i = 0; i < _recipients.length; i++) {
            AllowanceContract newChildContract = new AllowanceContract();

            // Set allowances for each recipient
            newChildContract.setAllowance(
                _recipients[i],
                _amounts[i],
                _startTimes[i],
                _endTimes[i],
                _recipientNames[i]
            );

            emit ContractCreated(msg.sender, address(newChildContract));
        }
    }

    // event ContractCreated(address creator, address contractAddr);
    // mapping(address => AllowanceContract) public addr_to_contract;

    // function deployChildContract(
    //     address _provider,
    //     address[] memory _recipients,
    //     uint _transferDay,
    //     uint _startTime,
    //     uint _endTime
    // ) public {
    //     AllowanceContract newChildContract = new AllowanceContract(
    //         _provider,
    //         _recipients,
    //         _transferDay,
    //         _startTime,
    //         _endTime
    //     );
    //     addr_to_contract[msg.sender] = newChildContract;
    //     emit ContractCreated(msg.sender, address(newChildContract));
    // }
}
