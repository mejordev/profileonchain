import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { shortenAddr } from '@/lib/utils';
import { useAccount, useDisconnect } from 'wagmi';
import { FaChevronDown } from 'react-icons/fa';
import Link from 'next/link';
import { DEFAULT_CHAIN } from '@/constants/global';

export function ConnectButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const chainConfig = DEFAULT_CHAIN;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 shadow-none">
          {shortenAddr(address!)}
          <FaChevronDown size={10} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-35" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 ">
            <div className="text-xs leading-none text-muted-foreground">
              {shortenAddr(address!)}
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            target="_blank"
            href={`${
              chainConfig!.chain.blockExplorers?.default.url
            }/address/${address}`}
          >
            <DropdownMenuItem>View on scan</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => disconnect()}>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
