import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import { Dashboard } from '@/app/Components/Shared/Dashboard/Dashboard';
import AddBookForm from '@/app/Components/Forms/AddBookForm/AddBookForm';
import MiniRecommended from '@/app/Components/MiniRecommended/MiniRecommended';
import MyLibrary from '@/app/Components/MyLibrary/MyLibrary';
import { Metadata } from 'next';

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
  return (
    <>
      <PageLayout
        sidebar={
          <Dashboard>
            <AddBookForm />
            <MiniRecommended />
          </Dashboard>
        }
      >
        <MyLibrary />
      </PageLayout>
    </>
  );
}
