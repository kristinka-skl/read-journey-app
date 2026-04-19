import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'small' | 'large';
}
export default function Modal({ isOpen, onClose, size, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };
  const modalClasses = `${css.modal} ${size ? css[size] : ''}`;
  return createPortal(
    <>
      <div className={css.backdrop} onClick={handleBackdropClick}>
        <div className={modalClasses}>
          <button className={css.closeBtn} onClick={onClose}>
            <svg className={css.closeIcon} width={22} height={22}>
              <use href="/sprite.svg#icon-close"></use>
            </svg>
          </button>
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}
