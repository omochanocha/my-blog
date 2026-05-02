import { GoogleAnalytics } from '@next/third-parties/google';
import { Inter, Noto_Sans_JP } from 'next/font/google';

import { Header } from './components/Header';
import { ThemeProvider } from './components/Theme-provider';

import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
};

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSans.variable} ${inter.variable} flex flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="my-12 grid grow grid-cols-1 px-4 md:mx-auto md:w-full md:max-w-5xl md:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
      {process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID'] != null && (
        <GoogleAnalytics gaId={process.env['NEXT_PUBLIC_GOOGLE_ANALYTICS_ID']} />
      )}
    </html>
  );
};

export default RootLayout;
