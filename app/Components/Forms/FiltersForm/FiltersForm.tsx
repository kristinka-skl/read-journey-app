'use client';

import { FiltersFormData } from '@/app/types/book';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import css from './FiltersForm.module.css';

import * as yup from 'yup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FormInputs = Pick<FiltersFormData, 'title' | 'author'>;

const schema: yup.ObjectSchema<FormInputs> = yup.object({
  title: yup.string().trim().max(100, 'Title is too long').default(''),
  author: yup.string().trim().max(50, 'Author name is too long').default(''),
});

export const FiltersForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
    },
  });

  const onSubmit = async (data: FormInputs) => {
    try {
      const params = new URLSearchParams(searchParams);
      console.log('Filters to apply:', data);

      if (data.title) params.set('title', data.title);
      else params.delete('title');

      if (data.author) params.set('author', data.author);
      else params.delete('author');

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
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
              placeholder="Enter title"
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
              Author:
            </label>
            <input
              id="author"
              type="text"
              className={css.input}
              {...register('author')}
              placeholder="Enter author"
            />

            {errors.author && (
              <p className={css.error}>{errors.author.message}</p>
            )}
          </div>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitBtn}>
            To apply
          </button>
        </div>
      </form>
    </section>
  );
};
