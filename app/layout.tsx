import 'modern-normalize/modern-normalize.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Container from './Components/Shared/Container/Container';
import ToasterProvider from './Components/Shared/Toaster/Toaster';
import TanStackProvider from './Components/Shared/TanStackProvider/TanStackProvider';

const gilroy = localFont({
  src: [
    {
      path: '../public/fonts/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gilroy',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Read Journey',
  description:
    'Application to create personal books collection and track reading progress',
  openGraph: {
    title: 'Read Journey',
    description:
      'Create your personal book collection and track reading progress with ease',
    url: 'https://read-journey-app-gilt.vercel.app/',
    siteName: 'Read Journey',
    images: [
      {
        url: '/images/ReadJourneyOG.webp',
        width: 1200,
        height: 630,
        alt: 'Read Journey app dashboard showing reading progress',
      },
    ],
    type: 'article',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gilroy.variable}`}>
      <body>
        <TanStackProvider>
          <Container>
            {children}
            <ToasterProvider />
          </Container>
        </TanStackProvider>
      </body>
    </html>
  );
}
