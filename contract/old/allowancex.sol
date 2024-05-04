// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPUSHCommInterface {
    function sendNotification(
        address _channel,
        address _recipient,
        bytes calldata _identity
    ) external;
}
contract AllowanceContract {
    struct Transaction {
        uint amount;
        address recipient;
        uint timestamp;
    }

    struct Allowance {
        uint amount;
        uint startTime;
        uint endTime;
        mapping(address => string) recipientNames; // Mapping to associate name with each recipient
        mapping(address => Transaction[]) transactions; // Mapping to store transactions for each recipient
    }

    mapping(address => Allowance) public allowances;
    mapping(address => uint) public totalAllowance;
    mapping(address => uint) public totalBenefactors;

    address public provider;

    event AllowanceSet(
        address indexed recipient,
        uint amount,
        uint startTime,
        uint endTime
    );
    event TransactionRecorded(
        address indexed recipient,
        uint amount,
        address indexed recipientAddress,
        string recipientName,
        uint timestamp
    );

    modifier onlyProvider() {
        require(
            msg.sender == provider,
            "Only the provider can perform this action"
        );
        _;
    }

    constructor() {
        provider = msg.sender;
    }

    function setAllowance(
        address _recipient,
        uint _amount,
        uint _startTime,
        uint _endTime,
        string memory _recipientName
    ) external onlyProvider {
        require(_startTime < _endTime, "Invalid time frame");
        require(_amount > 0, "Allowance amount must be greater than zero");

        Allowance storage allowance = allowances[_recipient];
        allowance.amount = _amount;
        allowance.startTime = _startTime;
        allowance.endTime = _endTime;
        allowance.recipientNames[_recipient] = _recipientName;

        totalAllowance[msg.sender] += _amount;
        totalBenefactors[_recipient] += 1;

        emit AllowanceSet(_recipient, _amount, _startTime, _endTime);
    }

    function spendAllowance(uint _amount, address _recipient) external {
        Allowance storage allowance = allowances[msg.sender];
        require(allowance.amount >= _amount, "Insufficient allowance");
        require(
            block.timestamp >= allowance.startTime &&
                block.timestamp <= allowance.endTime,
            "Allowance period expired"
        );

        allowance.transactions[_recipient].push(
            Transaction(_amount, _recipient, block.timestamp)
        );
        allowance.amount -= _amount;

        emit TransactionRecorded(
            _recipient,
            _amount,
            _recipient,
            allowance.recipientNames[_recipient],
            block.timestamp
        );
    }

    function getTransactionCount(
        address _recipient
    ) external view returns (uint) {
        return allowances[msg.sender].transactions[_recipient].length;
    }

    function getAllowanceDetails(
        address _recipient
    )
        external
        view
        returns (
            uint totalAllowanceAmount,
            uint remainingAllowance,
            uint transactionCount,
            Transaction[] memory transactions
        )
    {
        Allowance storage allowance = allowances[msg.sender];
        totalAllowanceAmount = totalAllowance[msg.sender];
        remainingAllowance = allowance.amount;
        transactionCount = allowance.transactions[_recipient].length;
        transactions = allowance.transactions[_recipient];
    }

    // address public provider;
    // mapping(address => uint) public allowances;
    // uint public transferDay;
    // uint public startTime;
    // uint public endTime;
    // string public transferMessage;
    // address[] public recipients;
    // uint256 contractBalance = 0;
    // event AllowanceSet(
    //     address indexed recipient,
    //     uint amount,
    //     uint startTime,
    //     uint endTime
    // );
    // event AllowanceTransferred(
    //     address indexed recipient,
    //     uint amount,
    //     string message
    // );
    // event RecipientRemoved(address indexed recipient);
    // event TransferMessage(string message);

    // constructor(
    //     address _provider,
    //     address[] memory _recipients,
    //     uint _transferDay,
    //     uint _startTime,
    //     uint _endTime
    // ) payable {
    //     provider = _provider;
    //     transferDay = _transferDay;
    //     startTime = _startTime;
    //     endTime = _endTime;
    //     recipients = _recipients;

    //     for (uint i = 0; i < _recipients.length; i++) {
    //         allowances[_recipients[i]] = 0;
    //     }
    //     contractBalance += msg.value;
    // }

    // function send_notification(
    //     string memory title,
    //     string memory body,
    //     address to
    // ) internal {
    //     IPUSHCommInterface(0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa)
    //         .sendNotification(
    //             0x5605C29B9a6b86aDf7C570bb419580f5E112D2ac, // from channel - recommended to set channel via dApp and put it's value -> then once contract is deployed, go back and add the contract address as delegate for your channel
    //             to,
    //             // to recipient, put address(this) in case you want Broadcast or Subset. For targeted put the address to which you want to send
    //             bytes(
    //                 string(
    //                     // We are passing identity here: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
    //                     abi.encodePacked(
    //                         "0", // this represents minimal identity, learn more: https://push.org/docs/notifications/notification-standards/notification-standards-advance/#notification-identity
    //                         "+", // segregator
    //                         "3", // define notification type:  https://push.org/docs/notifications/build/types-of-notification (1, 3 or 4) = (Broadcast, targeted or subset)
    //                         "+", // segregator
    //                         title, // this is notification title
    //                         "+", // segregator
    //                         body // notification body
    //                     )
    //                 )
    //             )
    //         );
    // }
    // function deposit() public payable {
    //     contractBalance += msg.value;
    // }

    // function setAllowances(
    //     address[] memory _recipients,
    //     uint[] memory amounts
    // ) public {
    //     require(msg.sender == provider, "Only the provider can set allowances");
    //     require(_recipients.length == amounts.length, "Arrays length mismatch");

    //     for (uint i = 0; i < _recipients.length; i++) {
    //         allowances[_recipients[i]] = amounts[i];
    //         send_notification(
    //             "Allowance",
    //             "You have been allowed 10 USDC",
    //             _recipients[i]
    //         );
    //     }
    //     emit AllowanceSet(
    //         _recipients[_recipients.length - 1],
    //         amounts[amounts.length - 1],
    //         startTime,
    //         endTime
    //     );
    // }

    // function transferAllowance(address receiver, uint256 amount) public {
    //     require(
    //         block.timestamp >= startTime && block.timestamp <= endTime,
    //         "Allowance transfer not allowed at this time"
    //     );

    //     for (uint i = 0; i < recipients.length; i++) {
    //         address recipient = recipients[i];
    //         uint allowed_amount = allowances[recipient];
    //         require(
    //             amount <= allowed_amount,
    //             "amount greater than allowed amount"
    //         );
    //         allowances[recipient] -= amount;
    //         payable(receiver).transfer(amount);
    //         emit AllowanceTransferred(recipient, amount, transferMessage);
    //     }
    // }

    // function removeRecipient(address recipient) public {
    //     require(
    //         msg.sender == provider,
    //         "Only the provider can remove recipients"
    //     );
    //     delete allowances[recipient];
    //     emit RecipientRemoved(recipient);
    // }

    // function setTransferMessage(string memory message) public {
    //     require(
    //         msg.sender == provider,
    //         "Only the provider can set transfer messages"
    //     );
    //     transferMessage = message;
    //     emit TransferMessage(message);
    // }
}
