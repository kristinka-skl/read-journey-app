import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout'
import css from './libraryPage.module.css'
import { Dashboard } from '@/app/Components/Shared/Dashboard/Dashboard'
import Recommended from '@/app/Components/Recommended/Recommended'
import AddBookForm from '@/app/Components/Forms/AddBookForm/AddBookForm'
import MiniRecommended from '@/app/Components/MiniRecommended/MiniRecommended'

export default function Library(){
    return <>
    
    
        <PageLayout
          sidebar={
            <Dashboard>
<AddBookForm/>
<MiniRecommended/>
            </Dashboard>
          }
        >
          <p>My library</p>
        </PageLayout>
      </>
}