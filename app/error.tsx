'use client'; 

import { useEffect } from 'react';
import css from './errorPage.module.css'; 

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error('Global Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className={css.container}>
      <h2 className={css.title}>Something went wrong</h2>
      <p className={css.text}>
        {error.message || 'We encountered an unexpected error while trying to load this page.'}
      </p>
      <button 
        type="button" 
        className={css.button} 
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}