import { Metadata } from 'next';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getBooks } from '@/app/lib/clientApi';
import RecommendedPageClient from './RecommendePage.client';

export const metadata: Metadata = {
  title: 'Recommended Books | Read Journey',
  description:
    'Discover your next favorite book. Browse our curated recommendations, apply custom filters to find exactly what you want, and easily add exciting new titles to your personal reading library.',
  openGraph: {
    title: 'Discover Recommended Books | Read Journey',
    description:
      'Browse curated recommendations, apply custom filters, and add exciting new titles to your personal reading library.',
    url: 'https://read-journey-app-gilt.vercel.app/recommended',
    siteName: 'Read Journey',
    images: [
      {
        url: '/images/ReadJourneyOG.webp',
        width: 1200,
        height: 630,
        alt: 'Read Journey app - Recommended books dashboard',
      },
    ],
    type: 'website',
  },
};
interface RecommendedPageProps {
  params: Promise<{ title: string; author: string }>;
}
export default async function RecommendedPage({
  params,
}: RecommendedPageProps) {
  const { title, author } = await params;
  const page = 1;
  const limit = 10;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['books', 'recommended', page, limit, title, author],
    queryFn: () => getBooks(page, limit, title, author),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RecommendedPageClient />
    </HydrationBoundary>
  );
}
