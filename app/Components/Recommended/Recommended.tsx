'use client';
import css from './Recommended.module.css';
import { usePageLimit } from '@/app/hooks/usePageLimit';
import { getBooks } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Book } from '@/app/types/book';
import BookDetailsModal from '../Shared/BookDetailsModal/BookDetailsModal';

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
  const { data, isError, isSuccess, isFetching, isLoading } = useQuery({
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
  console.log('recommended books data:', data);
  
  if (!isClient || isLoading) {
    return <p>Loading recommendations...</p>;
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
              {'<'}
            </button>

            <button
              className={css.arrowBtn}
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages || isFetching} 
            >
              {'>'}
            </button>
          </div>
        </div>

       
        <ul className={css.booksGrid}>
          {data?.results?.map((book) => (
            <li key={book._id} className={css.bookCard} onClick={() => handleOpenModal(book)}>
           
              <Image src={book.imageUrl}
                alt={book.title}
                width={137}
                height={208}
                className={css.bookCover}/>
              
              <h3 className={css.bookTitle}>{book.title}</h3>
              <p className={css.bookAuthor}>{book.author}</p>
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
