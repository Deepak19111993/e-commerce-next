// 'use client';
import './globals.scss';
import ProviderComp from '@/components/ProviderComp/ProviderComp';
// import type { Metadata } from 'next';
// import { Inter } from '@next/font/google';
// import { wrapper } from '@/redux/store';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ProviderComp>{children}</ProviderComp>
      </body>
    </html>
  );
}

// export default wrapper.withRedux(RootLayout);
