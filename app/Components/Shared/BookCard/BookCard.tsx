import Image from 'next/image';
import css from './BookCard.module.css';
import { Book, OwnBook } from '@/app/types/book';

interface BookCardProps {
  book: Book | OwnBook;
  size?: 'small' | 'medium' | 'large';
  onDeleteClick?: () => void;
  isDeleting?: boolean;
}
export default function BookCard({
  book,
  size = 'medium',
  onDeleteClick,
  isDeleting = false,
}: BookCardProps) {
  const dimensions = {
    small: { width: 71, height: 107 },
    medium: { width: 137, height: 208 },
    large: { width: 140, height: 213 },
  };
  const { width, height } = dimensions[size];
  const hasImage = book.imageUrl && book.imageUrl.trim() !== '';
  const cardClasses = `${css.bookDetails} ${css[size]}`;
  return (
    <div className={cardClasses}>
      {hasImage ? (
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={width}
          height={height}
          className={css.bookCover}
        />
      ) : (
        <div
          className={css.placeholder}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <span className={css.icon}>
            <Image width={111} height={72} alt='No image' src='/images/no-cover.png'/>
          </span>
          
        </div>
      )}

      <div className={css.bookInfo}>
        <div className={`${css.titleAndAuthor} ${onDeleteClick ? css.delete : ''}`}>
        <h3 className={css.bookTitle}>{book.title}</h3>
        <p className={css.bookAuthor}>{book.author}</p></div>
        {size === 'large' && (
          <p className={css.bookPages}>{book.totalPages} pages</p>
        )}
        {onDeleteClick && (
          <button
          className={css.trashBtn}
          disabled={isDeleting}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (isDeleting) return;
              onDeleteClick();
            }}
          >
            <svg className={css.trashIcon}><use href='/sprite.svg#icon-trash'></use></svg>
          </button>
        )}
      </div>
    </div>
  );
}
