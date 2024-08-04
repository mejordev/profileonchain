import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CHAIN_CONFIGS, DEFAULT_CHAIN } from "@/constants/global";
import Image from "next/image";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

function NetworkInfo() {
  const { chain } = useAccount();
  const { chains, error, switchChain } = useSwitchChain();

  const defaultChainId = DEFAULT_CHAIN?.chain.id.toString();

  const { toast } = useToast();

  useEffect(() => {
    if (error?.message) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }, [error]);

  if (chain === undefined || !chains.map((item) => item.id).includes(chain.id))
    return (
      <Button
        variant="destructive"
        onClick={() => switchChain?.({ chainId: DEFAULT_CHAIN.chain.id })}
      >
        Switch to supported chain
      </Button>
    );

  return (
    <>
      <Select
        onValueChange={(value) => {
          switchChain?.({ chainId: Number(value) });
        }}
        defaultValue={defaultChainId}
        value={chain.id.toString()}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {CHAIN_CONFIGS.map((x) => (
            <SelectItem value={x.chain.id.toString()} key={x.chain.id}>
              <div className="flex">
                <Image
                  src={x.chainLogo}
                  className="w-5 mr-2"
                  width={20}
                  height={20}
                  alt="chain icon"
                />
                {x.chain.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
export default NetworkInfo;
