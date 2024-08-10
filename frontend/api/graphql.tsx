import { schemaEncoder } from '@/constants/global';
import { UserData } from '@/store/types';
import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = 'https://base-sepolia.easscan.org/graphql';

export const client = new GraphQLClient(GRAPHQL_ENDPOINT);

export const ATTESTATION_QUERY = `
  query Attestation($id: String!) {
    attestation(where: { id: $id }) {
      id
      attester
      recipient
      refUID
      revocable
      revocationTime
      expirationTime
      data
    }
  }
`;

export interface Attestation {
  id: string;
  attester: string;
  recipient: string;
  refUID: string;
  revocable: boolean;
  revocationTime: string;
  expirationTime: string;
  data: string;
}

export interface AttestationResponse {
  attestation: Attestation | null;
}

export const fetchProfile = async (
  profileId: string,
): Promise<UserData | null> => {
  try {
    const response: AttestationResponse = await client.request(
      ATTESTATION_QUERY,
      { id: profileId },
    );

    if (!response.attestation) {
      console.error('No attestation data found');
      return null;
    }

    const decodedData = schemaEncoder.decodeData(response.attestation.data);
    return mapDecodedDataToUserData(decodedData);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return null;
  }
};

const mapDecodedDataToUserData = (dataArray: any[]): UserData => {
  const userData: Partial<UserData> = dataArray.reduce((acc, item) => {
    const value = item.value?.value || '';
    switch (item.name) {
      case 'name':
      case 'description':
      case 'avatarUrl':
      case 'website':
      case 'bitcoin':
      case 'ethereum':
      case 'solana':
      case 'polkadot':
      case 'ton':
      case 'litecoin':
      case 'ripple':
        acc[item.name] = value;
        break;
      default:
        break;
    }
    return acc;
  }, {} as Partial<UserData>);

  return {
    name: userData.name || '',
    bitcoin: userData.bitcoin || '',
    ethereum: userData.ethereum || '',
    solana: userData.solana || '',
    polkadot: userData.polkadot || '',
    ton: userData.ton || '',
    litecoin: userData.litecoin || '',
    ripple: userData.ripple || '',
    description: userData.description,
    avatarUrl: userData.avatarUrl,
    website: userData.website,
  };
};
