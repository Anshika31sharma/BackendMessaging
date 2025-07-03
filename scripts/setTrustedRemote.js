const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const senderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  const receiverAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; 
  const dstChainId = 31337; // <-- Use localhost chain ID

  const sender = await ethers.getContractAt("MessageSender", senderAddress);

  const trustedRemote = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address"],
    [receiverAddress, senderAddress]
  );

  const tx = await sender.setTrustedRemoteAddress(dstChainId, trustedRemote);
  await tx.wait();

  console.log(`✅ Trusted remote set for chain ${dstChainId}`);
}

main().catch((error) => {
  console.error("❌ Error setting trusted remote:", error);
  process.exitCode = 1;
});
