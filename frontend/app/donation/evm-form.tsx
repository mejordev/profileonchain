import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import NetworkInfo from '@/components/topBar/NetworkInfo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  type BaseError,
  useWaitForTransactionReceipt,
  useWriteContract,
  useAccount,
} from 'wagmi';
import { parseEther } from 'viem';
import { useUserStore } from '@/store/user.store';
import { ConnectSheet } from '@/components/topBar/ConnectSheet';
import { profileRouterAbi } from '@/abis/profileRouterAbi';
import Link from 'next/link';
const EvmForm = () => {
  const { ethereum } = useUserStore();
  const { address, chain } = useAccount();
  const { data: hash, error, isPending, writeContract } = useWriteContract();
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = ethereum as `0x${string}`;
    const value = formData.get('value') as string;
    console.log('valueee', value);
    writeContract({
      address: '0xE62Fd71c88EB706E657990d758DAc47bEFe82cC4',
      abi: profileRouterAbi.abi,
      functionName: 'transferWithFee',
      value: BigInt(parseEther(value)),
      args: [to],
    });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle>Donate Using Supported Blockchains</CardTitle>
        <CardDescription className="pt-4">
          Currently, we only track donations on the blockchains form select list
          below. However, you can also send donations to other blockchain
          addresses provided in the section below.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={submit}>
          <div className="grid gap-3">
            <Label htmlFor="network">Select chain:</Label>
            <NetworkInfo></NetworkInfo>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              name="value"
              type="number"
              min={0}
              className="w-full"
              step="0.00000000001"
              placeholder="Enter Amount"
            />

            {address ? (
              <>
                <Button className="w-full" disabled={isPending} type="submit">
                  {isPending ? 'Confirming...' : 'Send'}
                </Button>
              </>
            ) : (
              <ConnectSheet />
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t w-full px-6 py-4 text-center">
        {isConfirming && <div>Waiting for confirmation... </div>}
        {isConfirmed && <div>Transaction confirmed: </div>}
        {hash && (
          <Button variant="link">
            {' '}
            <Link
              target="_blank"
              href={`${chain!.blockExplorers?.default.url}/tx/${hash}`}
            >
              Check tx block explorer
            </Link>
          </Button>
        )}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EvmForm;
