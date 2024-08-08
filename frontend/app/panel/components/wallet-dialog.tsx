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
//TODO fix alerts look
export const WalletDialog = () => {
  const { walletsLog } = useWallets();

  // Split the walletsLog string into an array using the newline character
  const walletsLogLines = walletsLog.split('\n');

  // Function to copy the walletsLog to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(walletsLog)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Function to clear the clipboard
  const clearClipboard = () => {
    navigator.clipboard
      .writeText('')
      .then(() => {
        alert('Clipboard cleared!');
      })
      .catch(err => {
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You need to copy and save these keys in a safe place. If you lose
            them, you will lose access to your money forever!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea className="h-[300px] rounded-md border p-4">
          <div className="text-sm whitespace-pre-wrap">
            {walletsLogLines.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </ScrollArea>
        <AlertDialogFooter>
          <Button onClick={copyToClipboard} className="mr-2">
            Copy to Clipboard
          </Button>
          <AlertDialogCancel onClick={clearClipboard}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clearClipboard}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
