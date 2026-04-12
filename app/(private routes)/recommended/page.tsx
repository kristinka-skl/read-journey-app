import css from './recommendedPage.module.css'
import { Dashboard } from '../../Components/Shared/Dashboard/Dashboard';
import { AddBookForm } from '../../Components/AddBookForm/AddBookForm';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';

export default function Recommended() {
  return (
    <PageLayout
      sidebar={
        <Dashboard>
          <AddBookForm />
        </Dashboard>
      }
    ><p>Recommended</p>
      
    </PageLayout>
  );
}

