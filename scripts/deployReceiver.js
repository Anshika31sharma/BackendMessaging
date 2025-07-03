const { ethers, network } = require("hardhat");
require("dotenv").config();

async function main() {
  let endpoint;

  if (network.name === "sepolia") {
    endpoint = process.env.SEPOLIA_ENDPOINT;
  } else if (network.name === "bnbTestnet" || network.name === "localhost") {
    endpoint = process.env.BNB_ENDPOINT;
  } else {
    throw new Error(`❌ Unsupported network: ${network.name}`);
  }

  if (!endpoint) throw new Error("❌ Endpoint not defined");

  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const MessageReceiver = await ethers.getContractFactory("MessageReceiver");
  const receiver = await MessageReceiver.deploy(endpoint);
  await receiver.waitForDeployment();

  console.log("✅ MessageReceiver deployed to:", receiver.target);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
