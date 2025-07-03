const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "ETH");

  const rawEndpoint = process.env.SEPOLIA_ENDPOINT;
  const layerZeroEndpoint = ethers.getAddress(rawEndpoint); 

  const MessageSender = await ethers.getContractFactory("MessageSender");
  const sender = await MessageSender.deploy(layerZeroEndpoint);

  await sender.waitForDeployment();
  console.log("✅ MessageSender deployed to:", await sender.getAddress());
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
