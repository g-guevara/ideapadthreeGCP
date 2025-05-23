import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import Providers from './providers';
import Header from '@/components/layout/Header';

const ThreeJSBackground = dynamic(() => import('@/components/ThreeJSBackground'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'IdeaForge - Collaborate on Innovative Ideas',
  description: 'Connect with others to bring innovative ideas to life',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <Providers>
          <ThreeJSBackground />
          <Header />
          <main className="pt-20 pb-12">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}