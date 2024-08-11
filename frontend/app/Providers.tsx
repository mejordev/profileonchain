'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { WagmiProvider } from 'wagmi';
import { ConfigWagmi } from '@/constants/global';
import { AppProvider } from './AppContext';

const queryClient = new QueryClient();

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = (props: ProvidersProps) => {
  const { children } = props;
  return (
    <WagmiProvider config={ConfigWagmi}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <AppProvider> */}
          {children}
          {/* </AppProvider> */}
        </NextThemesProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
