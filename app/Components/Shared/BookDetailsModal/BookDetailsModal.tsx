'use client';
import { Book, OwnBook } from '@/app/types/book';
import css from './BookDetailsModal.module.css';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import toast from 'react-hot-toast';
import { addBookFromRecommended } from '@/app/lib/clientApi';
import BookCard from '../BookCard/BookCard';
import Link from 'next/link';

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
  const handleAddToLibrary = async () => {
    try {
      console.log('book._id:', book._id);
      const res = await addBookFromRecommended(book._id);
      if (res) {
        toast.success('Book added to library');
        onClose();
      } else {
        throw Error;
      }
    } catch (error) {
      toast.error('Oops! Something went wrong');
    }
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
              Add to library
            </button>
          )}
        </div>
      </Modal>
    </>
  );
}
