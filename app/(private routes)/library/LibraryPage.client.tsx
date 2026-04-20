'use client';
import { PageLayout } from '@/app/Components/Shared/PageLayout/PageLayout';
import { Dashboard } from '@/app/Components/Shared/Dashboard/Dashboard';
import AddBookForm from '@/app/Components/Forms/AddBookForm/AddBookForm';
import MiniRecommended from '@/app/Components/MiniRecommended/MiniRecommended';
import MyLibrary from '@/app/Components/MyLibrary/MyLibrary';
import BookDetailsModal from '@/app/Components/Shared/BookDetailsModal/BookDetailsModal';
import { Book } from '@/app/types/book';
import { useState } from 'react';

export default function LibraryPageClient() {
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const handleOpenModal = (book: Book) => setBookDetails(book);
  const handleCloseModal = () => setBookDetails(null);

  return (
    <>
      <PageLayout
        sidebar={
          <Dashboard>
            <AddBookForm />
            <MiniRecommended onBookClick={handleOpenModal} />
          </Dashboard>
        }
      >
        <MyLibrary />
        {bookDetails && (
          <BookDetailsModal book={bookDetails} onClose={handleCloseModal} />
        )}
      </PageLayout>
    </>
  );
}
