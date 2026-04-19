'use client';
import css from './MiniRecommended.module.css';
import { getBooks } from '@/app/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import BookCard from '../Shared/BookCard/BookCard';
import { Loader } from '../Shared/Loader/Loader';

export default function MiniRecommended() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', 'recommended', 'mini'],
    queryFn: () => getBooks(1, 3),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return null;

  return (
    <section className={css.miniRecommendedSection}>
      <h2 className={css.sectionTitle}>Recommended books</h2>

      <ul className={css.booksGrid}>
        {data?.results?.map((book) => (
          <li key={book._id} className={css.bookCard}>
            <BookCard book={book} size="small" />
          </li>
        ))}
      </ul>

      <Link href="/recommended" className={css.link}>
        <p>Home</p>
        <svg className={css.redirect} width={20} height={20}>
          <use href="/sprite.svg#icon-redirect"></use>
        </svg>
      </Link>
    </section>
  );
}
