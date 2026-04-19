import css from './readingPage.module.css';
import ReadingPageClient from './readingPage.client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Active Reading Session | Read Journey',
  description:
    'Track your reading progress in real-time. Log your reading sessions, view your reading speed, and analyze your journey page by page with detailed diaries and visual statistics.',
  openGraph: {
    title: 'Track Reading Progress | Read Journey',
    description:
      'Log your reading sessions, view your reading speed, and analyze your journey with detailed diaries and visual statistics.',
    url: 'https://read-journey-app-gilt.vercel.app/reading',
    siteName: 'Read Journey',
    images: [
      {
        url: '/images/ReadJourneyOG.webp',
        width: 1200,
        height: 630,
        alt: 'Read Journey app - Active reading tracking and statistics',
      },
    ],
    type: 'website',
  },
};

export default function Reading() {
  return <ReadingPageClient />;
}
