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

const EvmForm = () => {
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
        <form className="flex flex-col gap-4">
          <div className="grid gap-3">
            <Label htmlFor="network">Select chain:</Label>
            <NetworkInfo></NetworkInfo>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="amount">Amount:</Label>
            <Input
              id="amount"
              type="number"
              min={0}
              className="w-full"
              step="0.00000000001"
              placeholder="Enter Amount"
              // onChange={onChange}
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="border-t w-full px-6 py-4">
        <Button className="w-full">Send donation</Button>
      </CardFooter>
    </Card>
  );
};

export default EvmForm;
