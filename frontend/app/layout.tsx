import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Footer } from '@/components/footer/Footer';
import { TopBar } from '@/components/topBar/TopBar';
import { Providers } from './Providers';
import { Toaster } from '@/components/ui/toaster';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'ProfilOnchain',
  description: 'Crypto donations simplified',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <Toaster />
          <div
            className={
              (cn(poppins.className),
              'relative flex flex-col min-h-screen lg:overflow-x-hidden')
            }
          >
            <TopBar />
            <div className="flex-1 flex">
              <main className="flex-1 flex flex-col items-center justify-between p-12">
                {children}
              </main>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
