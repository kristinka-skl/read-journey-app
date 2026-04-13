import css from './recommendedPage.module.css'
import { Dashboard } from '../../Components/Shared/Dashboard/Dashboard';
import { AddBookForm } from '../../Components/Forms/AddBookForm/AddBookForm';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import Recommended from '@/app/Components/Recommended/Recommended';

export default function RecommendedPage() {
  return (
    <PageLayout
      sidebar={
        <Dashboard>
          <AddBookForm />
        </Dashboard>
      }
    >
        <section className={css.recommendedSection}><h2>Recommended</h2>
        <Recommended/></section>
      
    </PageLayout>
  );
}

