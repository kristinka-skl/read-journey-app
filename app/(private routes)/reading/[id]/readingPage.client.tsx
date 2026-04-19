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
import { Loader } from '@/app/Components/Shared/Loader/Loader';
import Image from 'next/image';

enum Tabs {
  statistics = 'statistics',
  diary = 'diary',
}

export default function ReadingPageClient() {
  const params = useParams();
  const bookId = params.id as string;
  const [openTab, setOpenTab] = useState<Tabs>(Tabs.statistics);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: book,
    isError,
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
  const { mutate, isPending, variables } = useMutation({
    mutationFn: async (data: deleteReadingSessionRequest) =>
      await deleteReadingSession(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['book', bookId],
      });
      toast('Successfully deleted!');
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
  const deletingSessionId = isPending ? variables?.readingId : null;
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
            <div className={css.progressForm}>
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
                <Image
                  className={css.star}
                  width={32}
                  height={32}
                  alt="books"
                  src="/images/star.png"
                />
              </div>
            </div>
          ) : (
            <div className={css.progressTabs}>
              <div className={css.progressHeader}>
                <h3 className={css.progressTitle}>
                  {openTab === 'diary' ? 'Diary' : 'Statistics'}
                </h3>

                <div className={css.tabIcons}>
                  <div onClick={() => setOpenTab(Tabs.diary)}>
                    <svg
                      className={`${css.iconTab} ${openTab === Tabs.diary ? css.tabActive : ''}`}
                      width={16}
                      height={16}
                    >
                      <use href="/sprite.svg#icon-hourglass"></use>
                    </svg>
                  </div>
                  <div onClick={() => setOpenTab(Tabs.statistics)}>
                    <svg
                      className={`${css.iconTab} ${openTab === Tabs.statistics ? css.tabActive : ''}`}
                      width={16}
                      height={16}
                    >
                      <use href="/sprite.svg#icon-pie-chart"></use>
                    </svg>
                  </div>
                </div>
              </div>
              {openTab === 'statistics' ? (
                <p className={css.statInfoText}>
                  Each page, each chapter is a new round of knowledge, a new
                  step towards understanding. By rewriting statistics, we create
                  our own reading history.
                </p>
              ) : null}

              {openTab === 'diary' ? (
                <Diary
                  sessionList={book.progress}
                  totalPages={totalPages}
                  onClick={handleDeleteReadingSession}
                  deletingSessionId={deletingSessionId}
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
        {isLoading && <Loader />}
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
              <div className={css.icon}>
                <Image
                  alt="thumb up"
                  width={50}
                  height={50}
                  src="/images/books.png"
                />
              </div>
              <p className={css.confModalTitle}>The book is read</p>
              <p className={css.confModalText}>
                It was an <span className={css.accent}>exiting journey</span>,
                where each page revealed new horizons, and the characters become
                inseparable friends
              </p>
            </div>
          }
        </Modal>
      )}
    </PageLayout>
  );
}
