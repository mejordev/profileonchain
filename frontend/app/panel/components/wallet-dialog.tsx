import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useWallets, useWalletsActions } from '@/store/wallets.store';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { useUserData } from '@/store/user.store';
import { createEasOffchain } from '@/api/eas';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const WalletDialog = () => {
  const { walletsLog, isCopied, ethereumPrivKey } = useWallets();
  const { toast } = useToast();
  const { setCopied, reset } = useWalletsActions();
  const userData = useUserData();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const goToDonation = (id: string) => {
    router.push('/donation/'.concat(id));
  };

  // Split the walletsLog string into an array using the newline character
  const walletsLogLines = walletsLog.split('\n');

  // Function to copy the walletsLog to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletsLog)
      .then(() => {
        toast({
          title: 'Copied',
          description: 'Copied to clipboard!',
        });
      })
      .catch(err => {
        toast({
          variant: 'destructive',
          title: 'Failed to copy: ',
          description: err,
        });
        console.error('Failed to copy: ', err);
      });
  };

  // Function to clear the clipboard
  const clearClipboard = () => {
    navigator.clipboard
      .writeText('')
      .then(() => {
        toast({
          title: 'Cleared!',
          description: 'Clipboard cleared!',
        });
      })
      .catch(err => {
        toast({
          variant: 'destructive',
          title: 'Failed to clear clipboard: ',
          description: err,
        });
        console.error('Failed to clear clipboard: ', err);
      });
  };

  const handleContinue = async () => {
    setIsLoading(true);
    try {
      clearClipboard();
      const id = await createEasOffchain(userData, ethereumPrivKey);
      goToDonation(id!);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to continue. Please try again.',
      });
      console.error('Error in handleContinue: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full">Show Keys</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Copy your wallets data!</AlertDialogTitle>
          <AlertDialogDescription>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>IMPORTANT!</AlertTitle>
              <AlertDescription>
                You need to copy and save these keys in a safe place. If you
                lose them, you will lose access to your money forever!{' '}
              </AlertDescription>
            </Alert>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="text-sm whitespace-pre-wrap">
            {walletsLogLines.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="savedKeys"
            checked={isCopied}
            onClick={event => {
              setCopied(!isCopied);
            }}
          />

          <label
            htmlFor="savedKeys"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I saved the wallet data in a secure place.
          </label>
        </div>
        <AlertDialogFooter>
          <Button onClick={copyToClipboard} className="mr-2">
            Copy to Clipboard
          </Button>

          {isCopied && (
            <Button onClick={handleContinue}>
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
