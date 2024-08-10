'use client';
import { useUser } from '@/store/user.store';
import ProfileCard from './components/profile-card';
import WalletCard from './components/wallet-card';

const Panel = () => {
  const { solana } = useUser();
  return (
    <div className="grid gap-10 w-full lg:w-1/2 md:w-3/4 sm:w-9/10">
      {solana === undefined ? <ProfileCard /> : <WalletCard />}
    </div>
  );
};

export default Panel;
