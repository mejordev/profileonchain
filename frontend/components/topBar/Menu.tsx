'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ConnectButton } from './ConnectButton';
import { ConnectSheet } from './ConnectSheet';
import NetworkInfo from './NetworkInfo';
import { Button } from '../ui/button';
import { useAccount } from 'wagmi';
import { useUserActions } from '@/store/user.store';

interface MenuProps {}

export const Menu = (props: MenuProps) => {
  const { address } = useAccount();
  const { setUser } = useUserActions();
  const router = useRouter();
  const pathname = usePathname();

  const goToUserPanel = () => {
    setUser(undefined);
    router.push('/panel');
  };

  // Check if the pathname includes the string "donation"
  const isDonationPage = pathname!.includes('donation');

  return (
    <>
      {/* <Button variant="link" onClick={goToUserPanel}>
        Docs
      </Button> */}
      {!pathname!.includes('panel') && (
        <Button className="text-white text-sm" onClick={goToUserPanel}>
          Create profile
        </Button>
      )}
      {isDonationPage && address ? (
        <>
          <NetworkInfo />
          <ConnectButton />
        </>
      ) : (
        isDonationPage && <ConnectSheet />
      )}
    </>
  );
};
