import css from "./PageLayout.module.css";

interface Props {
  sidebar: React.ReactNode; // Dashboard
  children: React.ReactNode; // Pages
}

export const PageLayout = ({ sidebar, children }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.contentWrapper}>{children}</div>
    </section>
  );
};