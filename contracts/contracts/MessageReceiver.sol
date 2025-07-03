// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

contract MessageReceiver is NonblockingLzApp {
    string public lastReceivedMessage;

    event MessageReceived(string message);

    constructor(address _endpoint) NonblockingLzApp(_endpoint) {}

    function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory payload) internal override {
        string memory message = abi.decode(payload, (string));
        lastReceivedMessage = message;
        emit MessageReceived(message);
    }
}
