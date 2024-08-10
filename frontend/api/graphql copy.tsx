// import { schemaEncoder } from '@/constants/global';
// import { UserData } from '@/store/types';
// import { GraphQLClient } from 'graphql-request';

// const endpoint = 'https://base-sepolia.easscan.org/graphql';

// export const client = new GraphQLClient(endpoint, {
//   headers: {
//     // Add any headers here, e.g., authorization if needed
//   },
// });

// export const ATTESTATION_QUERY = `
//   query Attestation($id: String!) {
//     attestation(
//       where: { id: $id }
//     ) {
//       id
//       attester
//       recipient
//       refUID
//       revocable
//       revocationTime
//       expirationTime
//       data
//     }
//   }
// `;

// export interface Attestation {
//   id: string;
//   attester: string;
//   recipient: string;
//   refUID: string;
//   revocable: boolean;
//   revocationTime: string;
//   expirationTime: string;
//   data: string;
// }

// export interface AttestationResponse {
//   attestation: Attestation | null;
// }
// export const fetchProfile = async (
//   profile_id: string,
// ): Promise<UserData | null> => {
//   try {
//     const response: AttestationResponse = await client.request(
//       ATTESTATION_QUERY,
//       {
//         id: profile_id,
//       },
//     );
//     console.log('Fetched Data:', response);
//     const dencodedData = schemaEncoder.decodeData(response.attestation!.data);
//     console.log(dencodedData);
//     console.log(parseUserData(dencodedData));
//     return parseUserData(dencodedData);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return null;
//   }
// };
// const parseUserData = (dataArray: any[]): UserData => {
//   const userData: Partial<UserData> = {};

//   dataArray.forEach(item => {
//     console.log('item:', item.value?.value);
//     switch (item.name) {
//       case 'name':
//         userData.name = item.value?.value || '';
//         break;
//       case 'description':
//         userData.description = item.value?.value;
//         break;
//       case 'avatarUrl':
//         userData.avatarUrl = item.value?.value;
//         break;
//       case 'website':
//         userData.website = item.value?.value;
//         break;
//       case 'bitcoin':
//         userData.bitcoin = item.value?.value || '';
//         break;
//       case 'ethereum':
//         userData.ethereum = item.value?.value || '';
//         break;
//       case 'solana':
//         userData.solana = item.value?.value || '';
//         break;
//       case 'polkadot':
//         userData.polkadot = item.value?.value || '';
//         break;
//       case 'ton':
//         userData.ton = item.value?.value || '';
//         break;
//       case 'litecoin':
//         userData.litecoin = item.value?.value || '';
//         break;
//       case 'ripple':
//         userData.ripple = item.value?.value || '';
//         break;
//       default:
//         break;
//     }
//   });

//   // Ensure that required fields have default values if not provided
//   return {
//     name: userData.name || '',
//     bitcoin: userData.bitcoin || '',
//     ethereum: userData.ethereum || '',
//     solana: userData.solana || '',
//     polkadot: userData.polkadot || '',
//     ton: userData.ton || '',
//     litecoin: userData.litecoin || '',
//     ripple: userData.ripple || '',
//     description: userData.description,
//     avatarUrl: userData.avatarUrl,
//     website: userData.website,
//   };
// };
