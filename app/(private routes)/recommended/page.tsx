import css from './recommendedPage.module.css'
import { Dashboard } from '../../Components/Shared/Dashboard/Dashboard';
import { FiltersForm } from '../../Components/Forms/FiltersForm/FiltersForm';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import Recommended from '@/app/Components/Recommended/Recommended';

export default function RecommendedPage() {
  return (
    <PageLayout
      sidebar={
        <Dashboard>
          <FiltersForm />
        </Dashboard>
      }
    >
        
        <Recommended/>
      
    </PageLayout>
  );
}

