import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useConnect } from "wagmi";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

export function ConnectSheet() {
  const { connect, connectors, error } = useConnect();

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

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="grid w-full">Connect wallet</Button>
      </SheetTrigger>
      <SheetContent className="bg-black">
        <SheetHeader>
          <SheetTitle>Select provider</SheetTitle>
          <div className="grid gap-2">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </Button>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
