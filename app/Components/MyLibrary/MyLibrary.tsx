'use client';
import { useForm } from 'react-hook-form';
import css from './MyLibrary.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { usePageLimit } from '@/app/hooks/usePageLimit';
import BookCard from '../Shared/BookCard/BookCard';
import { OwnBook, ProgressFilter } from '@/app/types/book';
import { deleteBookFromLibrary, getOwnBooks } from '@/app/lib/clientApi';
import { ApiError } from '@/app/api/api';
import BookDetailsModal from '../Shared/BookDetailsModal/BookDetailsModal';

interface FormInput {
  progress: ProgressFilter;
}

export default function MyLibrary() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentProgress =
    (searchParams.get('status') as ProgressFilter) || ProgressFilter.allBooks;

  const [bookDetails, setBookDetails] = useState<OwnBook | null>(null);
  const handleOpenModal = (book: OwnBook) => setBookDetails(book);
  const handleCloseModal = () => setBookDetails(null);

  const { register, watch } = useForm<FormInput>({
    defaultValues: {
      progress: currentProgress,
    },
  });
  const selectedProgress = watch('progress');
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentStatusInUrl = params.get('status') || ProgressFilter.allBooks;

    if (currentStatusInUrl === selectedProgress) {
      return;
    }

    if (selectedProgress === ProgressFilter.allBooks) {
      params.delete('status');
    } else {
      params.set('status', selectedProgress);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedProgress, pathname, router, searchParams]);

  const status = searchParams.get('status') || undefined;
  const { data, isError, isSuccess, isFetching, isLoading } = useQuery({
    queryKey: ['books', 'own', status],
    queryFn: () => getOwnBooks(status),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isError) {
      toast.error('Sorry, something went wrong, please try again');
    }
  }, [isError]);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => await deleteBookFromLibrary(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      toast('Successfully deleted from the library!');

      //   setErrors({});
    },
    onError: (error: ApiError) => {
      toast.error('Sorry, something went wrong. Please try again.');
    },
  });

  const handleDeleteBook = async (id: string) => {
    console.log('book id to delete:', id);
    mutate(id);
  };

  if (isLoading) {
    return <p>Loading recommendations...</p>;
  }

  return (
    <section className={css.myLibrarySection}>
      <div className={css.header}>
        <h2>My Library</h2>
        <form>
          <select {...register('progress')} className={css.dropdown}>
            <option value={ProgressFilter.allBooks}>All books</option>
            <option value={ProgressFilter.unread}>Unread</option>
            <option value={ProgressFilter.inProgress}>In progress</option>
            <option value={ProgressFilter.done}>Done</option>
          </select>
        </form>

        <ul className={css.booksGrid}>
          {data?.map((book) => (
            <li
              key={book._id}
              className={css.bookCard}
              onClick={() => handleOpenModal(book)}
            >
              <BookCard
                book={book}
                size="medium"
                onDeleteClick={() => handleDeleteBook(book._id)}
              />
            </li>
          ))}
        </ul>

        {bookDetails && (
          <BookDetailsModal
            book={bookDetails}
            onClose={handleCloseModal}
            startReading
          />
        )}
      </div>
    </section>
  );
}
