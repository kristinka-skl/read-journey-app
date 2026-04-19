import css from './recommendedPage.module.css';
import { Dashboard } from '../../Components/Shared/Dashboard/Dashboard';
import { FiltersForm } from '../../Components/Forms/FiltersForm/FiltersForm';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import Recommended from '@/app/Components/Recommended/Recommended';
import InfoBlock from '@/app/Components/InfoBlock/InfoBlock';
import { Metadata } from 'next';
import QuoteBlock from '@/app/Components/InfoBlock/QuoteBlock/QuoteBlock';

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

export default function RecommendedPage() {
  return (
    <PageLayout
      sidebar={
        <Dashboard>
          <FiltersForm />
          <InfoBlock />
          <QuoteBlock />
        </Dashboard>
      }
    >
      <Recommended />
    </PageLayout>
  );
}
