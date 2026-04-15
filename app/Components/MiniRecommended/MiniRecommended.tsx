'use client';
import css from './MiniRecommended.module.css';
import { getBooks } from '@/app/lib/clientApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';

export default function MiniRecommended() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['books', 'recommended', 'mini'], 
    queryFn: () => getBooks(1, 3), 
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading suggestions...</p>;
  if (isError) return null; 

  return (
    <section className={css.miniRecommendedSection}>
      <h2 className={css.sectionTitle}>Recommended books</h2>
      
      <ul className={css.booksGrid}>
        {data?.results?.map((book) => (
          <li key={book._id} className={css.bookCard}>
            <Image src={book.imageUrl}
                alt={book.title}
                width={71}
                height={107}
                className={css.bookCover}/>
              
              <h3 className={css.bookTitle}>{book.title}</h3>
              <p className={css.bookAuthor}>{book.author}</p>
              </li>
        ))}
      </ul>

      <Link href="/recommended" className={css.link}>
        <p>Home</p><p>{'=>'}</p>
      </Link>

     
    </section>
  );
}