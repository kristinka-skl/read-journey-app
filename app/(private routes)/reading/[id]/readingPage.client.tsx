'use client';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import css from './readingPage.module.css';
import { Dashboard } from '@/app/Components/Shared/Dashboard/Dashboard';
import ReadingProgressStart from '@/app/Components/Forms/ReadingProgress/ReadingProgressStart';
import ReadingProgressFinish from '@/app/Components/Forms/ReadingProgress/ReadingProgressFinish';
import BookCard from '@/app/Components/Shared/BookCard/BookCard';
import { useParams, usePathname } from 'next/navigation';
import { getBookDetails } from '@/app/lib/clientApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { act, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ReadingPageClient() {
  const params = useParams();
  console.log('params:', params);
  const bookId = params.id as string;

  const {
    data: book,
    isError,
    isSuccess,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookDetails(bookId),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isError) {
      toast.error('Sorry, something went wrong, please try again');
    }
  }, [isError]);

  const progress = book?.status === 'in-progress';
  const activeSession = book?.progress?.find(
    (session) => session.status === 'active'
  );
  const startPage = activeSession?.startPage || 1;
  const progressStatusClassName = activeSession
    ? css.progressIconFinish
    : css.progressIconStart;

  return (
    <PageLayout
      sidebar={
        <Dashboard>
          {book && (
            <div>
              {activeSession ? (
                <ReadingProgressFinish
                  startPage={startPage}
                  totalPages={book.totalPages}
                  bookId={book._id}
                />
              ) : (
                <ReadingProgressStart
                  totalPages={book.totalPages}
                  bookId={book._id}
                />
              )}
            </div>
          )}
          <p>Progress</p>
        </Dashboard>
      }
    >
      <section>
        <div className={css.header}>
          <h2>My reading</h2>
          {progress &&
            !activeSession && (
              <p className={css.timeLeft}>
                {book.timeLeftToRead?.hours} hours and{' '}
                {book.timeLeftToRead?.minutes} minutes left
              </p>
            )}
        </div>

        {book && (
          <>
            <BookCard book={book} size="large" />
            <div className={css.progressIcon}>
              <div className={progressStatusClassName}></div>
            </div>
          </>
        )}
      </section>
    </PageLayout>
  );
}
