'use client';
import { useForm } from 'react-hook-form';
import css from './AddBookForm.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BookFormData } from '@/app/types/book';
import { addBook } from '@/app/lib/clientApi';
import toast from 'react-hot-toast';
import Modal from '../../Shared/Modal/Modal';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiError } from '@/app/api/api';

type FormInputs = Pick<BookFormData, 'title' | 'author' | 'totalPages'>;

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  title: yup
    .string()
    .trim()
    .required('Book title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title is too long'),

  author: yup
    .string()
    .trim()
    .required('Author name is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(50, 'Author name is too long'),

  totalPages: yup
    .number()
    .typeError('Pages must be a valid number')
    .required('Number of pages is required')
    .positive('Pages must be a positive number')
    .integer('Pages must be a whole number')
    .min(1, 'A book must have at least 1 page')
    .max(10000, 'Maximum pages limit is 10000'),
});

export default function AddBookForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
    }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      totalPages: undefined,
    },
  });

  const queryClient = useQueryClient();
const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormInputs) =>
      await addBook(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      toast("Successfully added!");
      setIsModalOpen(true);
        reset();
    },
    onError: (error: ApiError) => {
      const serverMessage = 
        error?.response?.data?.response?.message || 
        error?.response?.data?.message ||           
        error?.message;                   

      if (serverMessage === 'Such book already exists') {
        toast.error('This book is already in your library!');
      } else {        
        toast.error('Sorry, something went wrong. Please try again.');
      }
    },
  })  

  const onSubmit = async (data: FormInputs) => {    
        mutate(data)}

  return (
    <section className={css.addBookSection}>
      <h2>Filters:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.fieldWrapper}>
          <div
            className={`${css.inputGroup} ${
              errors.title
                ? css.hasError
                : dirtyFields.title
                  ? css.isSuccess
                  : ''
            }`}
          >
            <label htmlFor="title" className={css.label}>
              Book title:
            </label>
            <input
              id="title"
              className={css.input}
              {...register('title')}
              placeholder="Enter text"
            />

            {errors.title && (
              <p className={css.error}>{errors.title.message}</p>
            )}
          </div>
        </div>

        <div className={css.fieldWrapper}>
          <div
            className={`${css.inputGroup} ${
              errors.author
                ? css.hasError
                : dirtyFields.author
                  ? css.isSuccess
                  : ''
            }`}
          >
            <label htmlFor="author" className={css.label}>
              The author:
            </label>
            <input
              id="author"
              type="text"
              className={css.input}
              {...register('author')}
              placeholder="Enter text"
            />

            {errors.author && (
              <p className={css.error}>{errors.author.message}</p>
            )}
          </div>
        </div>
        <div className={css.fieldWrapper}>
          <div
            className={`${css.inputGroup} ${
              errors.totalPages
                ? css.hasError
                : dirtyFields.totalPages
                  ? css.isSuccess
                  : ''
            }`}
          >
            <label htmlFor="totalPages" className={css.label}>
              Number of pages:
            </label>
            <input
              id="totalPages"
              type="text"
              className={css.input}
              {...register('totalPages')}
              placeholder="0"
            />

            {errors.totalPages && (
              <p className={css.error}>{errors.totalPages.message}</p>
            )}
          </div>
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitBtn}>
            {isPending ? 'Adding...' : 'Add book'}            
          </button>
        </div>
      </form>
      {isModalOpen && (
        <Modal size='small' isOpen onClose={handleModalClose}>
          <div className={css.confModal}><p className={css.titleModal}>Good job</p>
          <p className={css.text}>
            Your book is now in <span className={css.accent}>the library</span>! The joy knows no
            bounds and now you can start your training
          </p></div>
        </Modal>
      )}
    </section>
  );
}
