'use client';
import css from './Recommended.module.css';
import { usePageLimit } from '@/app/hooks/usePageLimit';
import { getBooks } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Book } from '@/app/types/book';
import BookDetailsModal from '../Shared/BookDetailsModal/BookDetailsModal';
import BookCard from '../Shared/BookCard/BookCard';
import { Loader } from '../Shared/Loader/Loader';

export default function Recommended() {
    const [bookDetails, setBookDetails] = useState<Book | null>(null);
    const handleOpenModal = (book: Book) => setBookDetails(book);
    const handleCloseModal = () => setBookDetails(null);
    
    const searchParams = useSearchParams();
    
    const title = searchParams.get('title') || undefined;
  const author = searchParams.get('author') || undefined;

  const [page, setPage] = useState(1);
  const { limit, isClient } = usePageLimit();
  const [prevLimit, setPrevLimit] = useState(limit);
  if (limit !== prevLimit) {
    setPage(1);
    setPrevLimit(limit);
  }
  const [prevTitle, setPrevTitle] = useState(title);
  const [prevAuthor, setPrevAuthor] = useState(author);
  if (title !== prevTitle || author !== prevAuthor) {
    setPage(1);
    setPrevTitle(title);
    setPrevAuthor(author);
  }
  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ['books', 'recommended', page, limit, title, author],
    queryFn: () => getBooks(page, limit, title, author),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    enabled: isClient,
  });
  useEffect(() => {
    if (isError) {
      toast.error('Sorry, something went wrong, please try again');
    }
  }, [isError]);
  
  if (!isClient || isLoading) {
    return <Loader/>;
  }

  const totalPages = data?.totalPages || 1;
  
  return (
    <>
      
      <section className={css.recommendedSection}>
        <div className={css.header}>
          <h2 className={css.sectionTitle}>Recommended</h2>
          <div className={css.pagination}>
            <button
              className={css.arrowBtn}
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
            >
              <svg className={css.arrowForward} width={16} height={16}><use href='/sprite.svg#icon-chevron-up'></use></svg>
             
            </button>

            <button
              className={css.arrowBtn}
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || isFetching} 
            >
              <svg className={css.arrowBack} width={16} height={16}><use href='/sprite.svg#icon-chevron-up'></use></svg>
             
            </button>
          </div>
        </div>

       
        <ul className={css.booksGrid}>
          {data?.results?.map((book) => (
            <li key={book._id} className={css.bookCard} onClick={() => handleOpenModal(book)}>
           <BookCard book={book} size='medium'/>              
            </li>
          ))}
        </ul>
        
        {bookDetails &&         
        <BookDetailsModal book={bookDetails} onClose={handleCloseModal}/>
        }
      </section>
      
    </>
  );
}
