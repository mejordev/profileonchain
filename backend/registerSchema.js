import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Replace with your actual schema registry contract address
const schemaRegistryContractAddress = "0x4200000000000000000000000000000000000020";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

if (!process.env.PRIVATE_KEY2) {
  console.error("Error: PRIVATE_KEY2 is not defined in the .env file");
  process.exit(1);
}

const url = 'https://sepolia.base.org';
const provider = ethers.getDefaultProvider('base-sepolia');

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY2, provider);


const account = wallet.address;
console.log(`Using account: ${account}`);

// Check the account balance
const getBalance = async () => {
  const balance = await provider.getBalance(account);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
};

await getBalance();

// Connect the schema registry to the signer
schemaRegistry.connect(wallet);

// Define the schema
const schema = "string name,string description,string avatarUrl,string website,string bitcoin,string ethereum";

const resolverAddress = "0x4200000000000000000000000000000000000020"; // Example resolver address
const revocable = true;

const registerSchema = async () => {
  try {
    const transaction = await schemaRegistry.register({
      schema,
      // resolverAddress,
      revocable,
    });

    console.log("Transaction created:", transaction.hash);

    // Wait for transaction to be mined
    const receipt = await transaction.wait();
    console.log("Schema registered successfully:", receipt);
  } catch (error) {
    console.error("Error registering schema:", error);
  }
};

// Execute the function to register the schema
registerSchema().catch(console.error);
