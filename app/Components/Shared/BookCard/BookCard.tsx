import Image from 'next/image';
import css from './BookCard.module.css';
import { Book } from '@/app/types/book';

interface BookCardProps {
  book: Book;
  size?: 'small' | 'medium' | 'large';
}
export default function BookCard({ book, size = 'medium' }: BookCardProps) {
  const dimensions = {
    small: { width: 71, height: 107 },
    medium: { width: 137, height: 208 },
    large: { width: 140, height: 213 },
  };
  const { width, height } = dimensions[size];

  const cardClasses = `${css.bookDetails} ${css[size]}`;
  return (
    <div className={cardClasses}>
      <Image
        src={book.imageUrl}
        alt={book.title}
        width={width}
        height={height}
        className={css.bookCover}
      />
      <div className={css.bookInfo}>
        <h3 className={css.bookTitle}>{book.title}</h3>
        <p className={css.bookAuthor}>{book.author}</p>
        {size === 'large' && (
          <p className={css.bookPages}>{book.totalPages} pages</p>
        )}
      </div>
    </div>
  );
}
