import { useUser, useUserActions } from "@/store/user.store";
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useAccount } from "wagmi";

type AppContextType = {};

const AppContext = createContext<AppContextType>({} as AppContextType);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const { isConnected, isDisconnected, address } = useAccount();
  const { setAddress, setUser } = useUserActions();
  const { address: userAddress } = useUser();

  useEffect(() => {
    if (isConnected && address) {
      if (userAddress && address !== userAddress) {
        reset();
      }
      setAddress(address);
    }
  }, [isConnected, address]);

  const reset = () => {
    setUser(undefined);
    setAddress(undefined);
  };


  useEffect(() => {
    if (isDisconnected) {
      reset();
    }
  }, [isDisconnected]);

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
