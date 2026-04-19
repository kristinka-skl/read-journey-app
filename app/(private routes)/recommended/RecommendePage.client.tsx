import css from './recommendedPage.module.css';
import { Dashboard } from '../../Components/Shared/Dashboard/Dashboard';
import { FiltersForm } from '../../Components/Forms/FiltersForm/FiltersForm';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import Recommended from '@/app/Components/Recommended/Recommended';
import InfoBlock from '@/app/Components/InfoBlock/InfoBlock';
import QuoteBlock from '@/app/Components/InfoBlock/QuoteBlock/QuoteBlock';

export default function RecommendedPageClient() {
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
