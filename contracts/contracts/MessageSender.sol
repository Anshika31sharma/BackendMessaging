// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract MessageSender is NonblockingLzApp {
    string public lastReceivedMessage;

    constructor(address _endpoint) NonblockingLzApp(_endpoint) {}

    function sendMessage(
        uint16 _dstChainId,
        bytes calldata _destination,
        string calldata _message
    ) public payable {
        _lzSend(
            _dstChainId,
            abi.encode(_message),
            payable(msg.sender),
            address(0x0),
            bytes(""),
            msg.value
        );
    }

    function _nonblockingLzReceive(
        uint16,              // _srcChainId
        bytes memory,        // _srcAddress
        uint64,              // _nonce
        bytes memory _payload
    ) internal override {
        string memory message = abi.decode(_payload, (string));
        lastReceivedMessage = message;
    }
}
