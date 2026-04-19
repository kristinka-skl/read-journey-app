'use client';
import { useForm } from 'react-hook-form';
import css from './ReadingProgress.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReadingRequest } from '@/app/types/book';
import toast from 'react-hot-toast';
import { ApiError } from '@/app/api/api';
import { finishReading } from '@/app/lib/clientApi';
import Modal from '../../Shared/Modal/Modal';

type FormInput = {
  page: number;
};
interface ReadingProgressProps {
  totalPages: number;
  bookId: string;
  startPage: number;
  onFinishReading: () => void;
}

export default function ReadingProgressFinish({
  totalPages,
  bookId,
  startPage,
  onFinishReading,
}: ReadingProgressProps) {
  const schema = useMemo(() => {
    return yup.object({
      page: yup
        .number()
        .typeError('Pages must be a valid number')
        .required('Number of pages is required')
        .positive('Pages must be a positive number')
        .integer('Pages must be a whole number')
        .min(startPage, `You started on page ${startPage}`)
        .max(totalPages, `Maximum page limit is ${totalPages}`),
    });
  }, [totalPages, startPage]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      page: undefined,
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ReadingRequest) => await finishReading(data),
    onSuccess(x, data) {
      queryClient.invalidateQueries({
        queryKey: ['book', bookId],
      });
      toast('Successfully finished reading session!');
      reset();
      if (data.page === totalPages) {
        onFinishReading();
        toast('Successfully finished reading book!');
      }
    },
    onError: (error: ApiError) => {
      const serverMessage = error.response?.data?.response?.message;

      if (
        serverMessage === "The finish page cann't be less than the start page"
      ) {
        toast.error('Finish page cannot be less than start page!');
      } else {
        toast.error(
          serverMessage || 'Sorry, something went wrong. Please try again.'
        );
      }
    },
  });

  const onSubmit = async (data: FormInput) => {
    const progressRequest: ReadingRequest = {
      id: bookId,
      page: data.page,
    };
    mutate(progressRequest);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <legend className={css.formTitle}>Finish page:</legend>
        <div className={css.fieldWrapper}>
          <div
            className={`${css.inputGroup} ${
              errors.page ? css.hasError : dirtyFields.page ? css.isSuccess : ''
            }`}
          >
            <label htmlFor="page" className={css.label}>
              Page number:
            </label>
            <input
              id="page"
              className={css.input}
              {...register('page')}
              placeholder="0"
            />

            {errors.page && <p className={css.error}>{errors.page.message}</p>}
          </div>
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitBtn}>
            {isPending ? 'Stopping...' : 'To stop'}
          </button>
        </div>
      </form>
    </>
  );
}
