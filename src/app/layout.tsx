import { PageLayout } from '@/components/layouts/page';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  metadataBase: new URL('https://postgres-starter.vercel.app'),
  title: 'Vercel Postgres Demo',
  description: 'A simple Next.js app with Vercel Postgres as the database',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='ja'>
      <body className={inter.variable}>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
