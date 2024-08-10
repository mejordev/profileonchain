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
  useSendTransaction,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { parseEther } from 'viem';
import { useUserStore } from '@/store/user.store';
const EvmForm = () => {
  const { ethereum } = useUserStore();
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = ethereum as `0x${string}`;
    const value = formData.get('value') as string;
    console.log('valueee', value);
    sendTransaction({ to, value: parseEther(value) });
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
            <Button className="w-full" disabled={isPending} type="submit">
              {isPending ? 'Confirming...' : 'Send'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t w-full px-6 py-4">
        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EvmForm;
