import Header from '../Components/Shared/Header/Header';
import css from './privateLayout.module.css'; 

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={css.appWrapper}>
      <Header />
      <main className={css.mainContent}>
        {children}
      </main>
    </div>
  );
}