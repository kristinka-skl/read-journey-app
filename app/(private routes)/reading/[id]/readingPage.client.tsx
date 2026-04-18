'use client';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import css from './readingPage.module.css';
import { Dashboard } from '@/app/Components/Shared/Dashboard/Dashboard';
import ReadingProgressStart from '@/app/Components/Forms/ReadingProgress/ReadingProgressStart';
import ReadingProgressFinish from '@/app/Components/Forms/ReadingProgress/ReadingProgressFinish';
import BookCard from '@/app/Components/Shared/BookCard/BookCard';
import { useParams } from 'next/navigation';
import { deleteReadingSession, getBookDetails } from '@/app/lib/clientApi';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Diary from '@/app/Components/Diary/Diary';
import Statistics from '@/app/Components/Statistics/Statistics';
import { ApiError } from '@/app/api/api';
import { deleteReadingSessionRequest } from '@/app/types/book';
import Modal from '@/app/Components/Shared/Modal/Modal';

enum Tabs {
  statistics = 'statistics',
  diary = 'diary',
}

export default function ReadingPageClient() {
  const params = useParams();
  console.log('params:', params);
  const bookId = params.id as string;
  const [openTab, setOpenTab] = useState<Tabs>(Tabs.statistics);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const progressArray = book?.progress || [];
  let lastReadPage = 0;

  if (progressArray.length > 0) {
    const allPages = progressArray.flatMap((session) => [
      session.startPage || 0,
      session.finishPage || 0,
    ]);
    lastReadPage = Math.max(...allPages);
  }
  const minStartPage = lastReadPage === 0 ? 1 : lastReadPage;

  const progress = book && book.status !== 'unread';
  const activeSession = book?.progress?.find(
    (session) => session.status === 'active'
  );
  const startPage = activeSession?.startPage || 1;
  const progressStatusClassName = activeSession
    ? css.progressIconFinish
    : css.progressIconStart;

  const totalPages = book?.totalPages || 1;
  const readPercentage = Number(((lastReadPage / totalPages) * 100).toFixed(2));

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: deleteReadingSessionRequest) =>
      await deleteReadingSession(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['book', bookId],
      });
      toast('Successfully deleted!');

      //   setErrors({});
    },
    onError: (error: ApiError) => {
      const serverMessage =
        error?.response?.data?.response?.message ||
        error?.response?.data?.message ||
        error?.message;
      toast.error(
        serverMessage || 'Sorry, something went wrong. Please try again.'
      );
    },
  });

  const handleDeleteReadingSession = (readingId: string) => {
    const delReq: deleteReadingSessionRequest = {
      bookId: bookId,
      readingId: readingId,
    };
    mutate(delReq);
  };

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
                  onFinishReading={() => setIsModalOpen(true)}
                />
              ) : (
                <ReadingProgressStart
                  totalPages={book.totalPages}
                  bookId={book._id}
                  minPage={minStartPage}
                />
              )}
            </div>
          )}

          {!progress ? (
            <div className={css.progressEmpty}>
              <h3>Progress</h3>
              <p className={css.text}>
                Here you will see when and how much you read. To record enter
                the page number and click To start above
              </p>
              <div className={css.progressEmptyIcon}>
                <div>star</div>
              </div>
            </div>
          ) : (
            <div className={css.progressTabs}>
              <div className={css.header}>
                <h3>{openTab === 'diary' ? 'Diary' : 'Statistics'}</h3>
                <div className={css.tabIcons}>
                  <p onClick={() => setOpenTab(Tabs.diary)}>D</p>
                  <p onClick={() => setOpenTab(Tabs.statistics)}>S</p>
                </div>
              </div>

              {openTab === 'diary' ? (
                <Diary
                  sessionList={book.progress}
                  totalPages={totalPages}
                  onClick={handleDeleteReadingSession}
                />
              ) : (
                <Statistics
                  readPercentage={readPercentage}
                  pagesRead={lastReadPage}
                />
              )}
            </div>
          )}
        </Dashboard>
      }
    >
      <section>
        <div className={css.header}>
          <h2>My reading</h2>
          {progress && !activeSession && (
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
      {isModalOpen && (
        <Modal isOpen onClose={() => setIsModalOpen(false)} size="small">
          {
            <div className={css.confModal}>
              <div className={css.icon}></div>
              <p className={css.confModalTitle}>The book is read</p>
              <p className={css.confModalText}>
                It was an <span className={css.accent}>exiting journey</span>, where each page revealed
                new horizons, and the characters become inseparable friends
              </p>
            </div>
          }
        </Modal>
      )}
    </PageLayout>
  );
}
