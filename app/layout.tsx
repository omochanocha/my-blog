import { Inter } from 'next/font/google';

import { Header } from './components/Header';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'My Blog',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body className={`${inter.variable} flex h-screen flex-col text-slate-700 antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
