import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useWallets } from '@/store/wallets.store';
import { ScrollArea } from '@/components/ui/scroll-area';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

export const WalletDialog = () => {
  const { walletsLog } = useWallets();
  const { toast } = useToast();

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
          title: 'Failed to copy: ',
          description: err,
        });
        console.error('Failed to clear clipboard: ', err);
      });
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
        <AlertDialogFooter>
          <Button onClick={copyToClipboard} className="mr-2">
            Copy to Clipboard
          </Button>
          <AlertDialogCancel onClick={clearClipboard}>
            Continue
          </AlertDialogCancel>
          {/* <AlertDialogAction onClick={clearClipboard}>
            Continue
          </AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
