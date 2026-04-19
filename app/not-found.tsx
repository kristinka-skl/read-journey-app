import Link from 'next/link';
import css from './errorPage.module.css';

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404</h1>
      <p className={css.text}>
        Sorry, the page you&#39;re looking for doesn&#39;t exist. It seems this
        page has been torn out of the book.
      </p>
      <Link href="/recommended" className={css.button}>
        Go to Home
      </Link>
    </div>
  );
}
