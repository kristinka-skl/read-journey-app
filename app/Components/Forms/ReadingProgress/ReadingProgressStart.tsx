'use client';
import { useForm } from 'react-hook-form';
import css from './ReadingProgress.module.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMemo } from 'react';
import { ReadingRequest } from '@/app/types/book';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { startReading } from '@/app/lib/clientApi';
import toast from 'react-hot-toast';
import { ApiError } from '@/app/api/api';

type FormInput = {
  page: number;
};

interface ReadingProgressProps {
  totalPages: number;
  bookId: string;
}
export default function ReadingProgressStart({
  totalPages,
  bookId,
}: ReadingProgressProps) {
  const schema = useMemo(() => {
    return yup.object({
      page: yup
        .number()
        .typeError('Pages must be a valid number')
        .required('Number of pages is required')
        .positive('Pages must be a positive number')
        .integer('Pages must be a whole number')
        .min(1, 'A book must have at least 1 page')
        .max(totalPages, `Maximum page limit is ${totalPages}`),
    });
  }, [totalPages]);

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
    mutationFn: async (data: ReadingRequest) =>
      await startReading(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["book", bookId],
      });
      toast("Successfully started reading session!");
    //   setIsModalOpen(true);
        reset();
    //   setErrors({});
      
      
    },
    onError: (error: ApiError) => {
        const serverMessage = error.response?.data?.response?.message;        
        toast.error(serverMessage || 'Sorry, something went wrong. Please try again.');      
    },
  })
  

  const onSubmit = async (data: FormInput) => {
    const progressRequest: ReadingRequest = {
      id: bookId,
      page: data.page,
    };
    mutate(progressRequest);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <legend className={css.formTitle}>Start page:</legend>
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
          To start
        </button>
      </div>
    </form>
  );
}
