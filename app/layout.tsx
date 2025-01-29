import { Inter } from 'next/font/google';

import { Header } from './components/Header';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'My Blog',
};

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="ja">
      <body className={`${inter.variable} flex flex-col text-slate-700 antialiased`}>
        <Header />
        <main className="my-12 grid grow px-4 md:justify-items-center md:px-8">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
