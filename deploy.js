const ethers = require("ethers");
const fs = require("fs");

async function main() {
  // http://127.0.0.1:7545
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:7545"
  );
  const wallet = new ethers.Wallet(
    "ba42369584672d75f98596bcf0483602da7d30f82d37ff6fe9a75cffde596354",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy(); // STOP here! Wait for contract to deploy
  const transactionReceipt = await contract.deployTransaction.wait(1); // Wait 1 block to check if it was attached to the chain
  console.log("\nHere is the deployment transaction: ");
  console.log(contract.deployTransaction);
  console.log("\nHere is the transaction receipt: ");
  console.log(transactionReceipt);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
