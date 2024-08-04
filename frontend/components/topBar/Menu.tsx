"use client"
import { useUser } from "@/store/user.store";
import { useRouter, usePathname } from "next/navigation";
import { ConnectButton } from "./ConnectButton";
import { ConnectSheet } from "./ConnectSheet";
import NetworkInfo from "./NetworkInfo";
import { Button } from "../ui/button";

interface MenuProps {}

export const Menu = (props: MenuProps) => {
  const { address } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const goToUserPanel = () => {
    router.push("/panel");
  };

  const isIndexPage = pathname === "/";

  return (
    <>
      <Button
        variant="link"
        className="text-white text-sm"
        onClick={goToUserPanel}
      >
        Docs
      </Button>
      <Button className="text-white text-sm" onClick={goToUserPanel}>
        User panel
      </Button>
      {!isIndexPage && address ? (
        <>
          <NetworkInfo />
          <ConnectButton />
        </>
      ) : (
        !isIndexPage && <ConnectSheet />
      )}
    </>
  );
};