import { API_URL } from '@/constants/global';
import { UserData } from '@/store/types';
import axios from 'axios';

const mockData: UserData = {
  name: 'Test Name',
  description: 'Test Description',
  avatarUrl: 'http://example.com/avatar.png',
  website: 'http://example.com',
  bitcoin: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  ethereum: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  solana: 'SolanaMockAddress',
  polkadot: 'PolkadotMockAddress',
  ton: 'TonMockAddress',
  litecoin: 'LitecoinMockAddress',
  ripple: 'RippleMockAddress',
};

export const handleSubmit = async (url: string) => {
  try {
    const response = await axios.post(API_URL.concat(url), mockData);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log(error.response.data.message);
    } else {
      console.log('An error occurred');
    }
  }
};
