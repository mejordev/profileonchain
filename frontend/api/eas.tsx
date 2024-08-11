import {
  EAS_CONTRACT_ADDRESS,
  SCHEMA,
  SCHEMA_UID,
  schemaEncoder,
} from '@/constants/global';
import { UserData } from '@/store/types';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import { handleApiCreateCall } from './api';

// Initialize Schema Encoder

// Initialize EAS with contract address from environment
const eas = new EAS(EAS_CONTRACT_ADDRESS);

// Setup Ethereum provider and signer
const provider = ethers.getDefaultProvider('https://sepolia.base.org');

// Utility function to validate request body
const validateRequestBody = (body: UserData): string | null => {
  const { name, bitcoin, ethereum, solana, polkadot, ton, litecoin, ripple } =
    body;

  if (!name) return 'Name is required';

  const requiredAddress = {
    bitcoin,
    ethereum,
    solana,
    polkadot,
    ton,
    litecoin,
    ripple,
  };

  for (const [blockchain, value] of Object.entries(requiredAddress)) {
    if (!value || value.trim() === '') {
      return `${blockchain} address is required`;
    }
  }
  return null;
};

const encodeData = (body: UserData): string => {
  const {
    name,
    description = '',
    avatarUrl = '',
    website = '',
    bitcoin,
    ethereum,
    solana,
    polkadot,
    ton,
    litecoin,
    ripple,
  } = body;

  return schemaEncoder.encodeData([
    { name: 'name', value: name, type: 'string' },
    { name: 'description', value: description, type: 'string' },
    { name: 'avatarUrl', value: avatarUrl, type: 'string' },
    { name: 'website', value: website, type: 'string' },
    { name: 'bitcoin', value: bitcoin, type: 'string' },
    { name: 'ethereum', value: ethereum, type: 'address' },
    { name: 'solana', value: solana, type: 'string' },
    { name: 'polkadot', value: polkadot, type: 'string' },
    { name: 'ton', value: ton, type: 'string' },
    { name: 'litecoin', value: litecoin, type: 'string' },
    { name: 'ripple', value: ripple, type: 'string' },
  ]);
};

// Utility function to convert data to JSON with BigInt handling
function toJSON(data: unknown): string {
  const replacer = (key: string, value: unknown) =>
    typeof value === 'bigint' ? value.toString() : value;
  return JSON.stringify(data, replacer, 2);
}

// Handler for creating offchain attestation
export const createEasOffchain = async (
  profile: UserData,
  privateKey: string,
) => {
  try {
    const validationError = validateRequestBody(profile);
    if (validationError) {
      console.error({ message: validationError });
    }
    const signer = new ethers.Wallet(privateKey, provider);
    eas.connect(signer);
    const offchain = await eas.getOffchain();
    const encodedData = encodeData(profile);

    const attestation = await offchain.signOffchainAttestation(
      {
        recipient: signer.address,
        expirationTime: BigInt(0),
        time: BigInt(Math.floor(Date.now() / 1000)),
        revocable: true,
        schema: SCHEMA_UID,
        refUID:
          '0x0000000000000000000000000000000000000000000000000000000000000000',
        data: encodedData,
      },
      signer,
    );

    const rawData = toJSON(attestation);

    // const isValidAttestation = offchain.verifyOffchainAttestationSignature(
    //   signer.address,
    //   JSON.parse(rawData),
    // );
    const id = await handleApiCreateCall('/createChain', JSON.parse(rawData));
    return JSON.parse(id!).newAttestationUID!;
  } catch (error: any) {
    console.error(error.message);
  }
};
