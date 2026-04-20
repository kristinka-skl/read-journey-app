'use client';
import { Book, OwnBook } from '@/app/types/book';
import css from './BookDetailsModal.module.css';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';
import { addBookFromRecommended, getOwnBooks } from '@/app/lib/clientApi';
import BookCard from '../BookCard/BookCard';
import Link from 'next/link';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

interface BookDetailsModalProps {
  book: Book | OwnBook;
  onClose: () => void;
  startReading?: boolean;
}

export default function BookDetailsModal({
  book,
  onClose,
  startReading,
}: BookDetailsModalProps) {
  const {
    data: ownBooksList,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['books', 'own'],
    queryFn: () => getOwnBooks(),
    placeholderData: keepPreviousData,
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: string) => await addBookFromRecommended(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      toast.success('Book added to library');
      onClose();
    },
    onError: () => {
      toast.error('Sorry, something went wrong. Please try again.');
    },
  });

  const handleAddToLibrary = async () => {
    mutate(book._id);
  };

  const hasBookInLibrary =
    ownBooksList &&
    ownBooksList.findIndex((ownBook) => ownBook.title === book.title && ownBook.author === book.author) !== -1;

  return (
    <>
      <Modal isOpen onClose={onClose} size="large">
        <div className={css.modalContent}>
          <BookCard book={book} size="large" />
          {startReading ? (
            <Link className={css.secondaryButton} href={`/reading/${book._id}`}>
              Start reading
            </Link>
          ) : (
            <button
              type="button"
              onClick={handleAddToLibrary}
              disabled={hasBookInLibrary}
              className={css.secondaryButton}
            >
              {isPending
                ? 'Adding...'
                : hasBookInLibrary
                  ? 'Already in library'
                  : 'Add to library'}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
