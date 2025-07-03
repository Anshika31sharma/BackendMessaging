# 🛰️ Cross-Chain Messaging Backend

This is the **backend smart contract repository** for the [🌉 Cross-Chain Messaging DApp](https://github.com/Anshika31sharma/crosschain-messenger), powered by **LayerZero**. It includes the Solidity smart contracts and deployment scripts necessary to send and receive messages across two blockchains — typically from **Ethereum (Localhost)** to **Polygon Amoy (Sepolia-compatible)**.

## 🚀 Features

- ✅ `MessageSender.sol` and `MessageReceiver.sol` contracts
- 🌐 Deployable on both local and testnet chains
- 🧾 Emits `MessageSent` and `MessageReceived` events for frontend tracking
- 📡 Works seamlessly with LayerZero or mock messaging for development

## 💡 Message Flow

1. `MessageSender` is deployed on **source chain (Localhost)**.
2. `MessageReceiver` is deployed on **destination chain (Amoy/Sepolia)**.
3. When a user sends a message, `sendMessage()` is triggered with:
   - Destination chain ID
   - Destination contract address
   - Message content
4. Once confirmed, `MessageReceived` is emitted on the destination chain.
5. The frontend listens for and displays message delivery.

## 📁 Project Structure

freeTestEthers/
├── contracts/
│ ├── MessageSender.sol
│ └── MessageReceiver.sol
├── scripts/
│ ├── deploySender.js
│ └── deployReceiver.js
├── .env
├── hardhat.config.js
├── package.json
└── README.md

## 🔧 Environment Setup

### Prerequisites

- Node.js v18+
- Hardhat (`npm install --save-dev hardhat`)
- An RPC URL (e.g., Alchemy) for Sepolia
- Your wallet's private key with testnet ETH

## 🛠️ Installation

git clone https://github.com/Anshika31sharma/BackendMessaging
cd BackendMessaging
npm install

## 🧪 Local Development (Localhost + Hardhat)

1. Start the Hardhat Node

- npx hardhat node

2. Deploy Contracts Locally

- npx hardhat run scripts/deployReceiver.js --network localhost
- npx hardhat run scripts/deploySender.js --network localhost
