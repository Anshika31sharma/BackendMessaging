const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const receiverAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; 
  const senderAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const srcChainId = 31337; // <-- Use localhost chain ID

  const receiver = await ethers.getContractAt("MessageReceiver", receiverAddress);

  const trustedRemote = ethers.AbiCoder.defaultAbiCoder().encode(
    ["address", "address"],
    [senderAddress, receiverAddress]
  );

  const tx = await receiver.setTrustedRemoteAddress(srcChainId, trustedRemote);
  await tx.wait();

  console.log(`✅ Trusted remote set on receiver for chain ${srcChainId}`);
}

main().catch((error) => {
  console.error("❌ Error:", error);
  process.exitCode = 1;
});
