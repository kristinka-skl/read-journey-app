'use client';

import { Toaster } from 'react-hot-toast';
import css from './Toaster.module.css';

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        className: css.toast,         
        error: {
          className: `${css.toast} ${css.errorToast}`, 
        },
        success: {
          className: `${css.toast} ${css.successToast}`, 
        },
      }}
    />
  );
}