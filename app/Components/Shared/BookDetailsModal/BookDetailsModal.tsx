'use client';
import { Book, OwnBook } from '@/app/types/book';
import css from './BookDetailsModal.module.css';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';
import { addBookFromRecommended } from '@/app/lib/clientApi';
import BookCard from '../BookCard/BookCard';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/app/api/api';

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
    onError: (error: ApiError) => {
      toast.error('Sorry, something went wrong. Please try again.');
    },
  });

  const handleAddToLibrary = async () => {
    mutate(book._id);
  };

  return (
    <>
      <Modal isOpen onClose={onClose} size="large">
        <div className={css.modalContent}>
          <BookCard book={book} size="large" />
          {startReading ? (
            <Link href={`/reading/${book._id}`}>Start reading</Link>
          ) : (
            <button type="button" onClick={handleAddToLibrary}>
              {isPending ? 'Adding...' : 'Add to library'}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
