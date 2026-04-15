import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;  
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
};
export default function Modal({
    isOpen,
  onClose,
  size,  
  children,
}: ModalProps) {

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
  const className = `dialog ${size}`;
  return createPortal(
  <>
      <div className={css.backdrop} onClick={handleBackdropClick}><div className={css.modal}>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
       
        {children}
        
      </div></div>
      
    </>, document.body)
}
    
//   );
  
//   (
//     <>
//       <button onClick={() => setShowModal(true)}>
//         Show modal using a portal
//       </button>
//       {showModal && createPortal(
//         <ModalContent onClose={() => setShowModal(false)} />,
//         document.body
//       )}
//     </>
//   );
// }