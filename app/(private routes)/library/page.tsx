import { Metadata } from 'next';
import LibraryPageClient from './LibraryPage.client';

export const metadata: Metadata = {
  title: 'My Library | Read Journey',
  description:
    'Manage your personal book collection. Add new books, organize them by reading status, and keep track of everything you want to read, are currently reading, or have already finished.',
  openGraph: {
    title: 'My Personal Book Library | Read Journey',
    description:
      'Manage your book collection, organize titles by reading status, and start your next reading adventure.',
    url: 'https://read-journey-app-gilt.vercel.app/library',
    siteName: 'Read Journey',
    images: [
      {
        url: '/images/ReadJourneyOG.webp',
        width: 1200,
        height: 630,
        alt: 'Read Journey app - Personal book library management',
      },
    ],
    type: 'website',
  },
};

export default function Library() {
  return <LibraryPageClient/>
}
