'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import css from './AuthForm.module.css';
import { RegisterFormData } from '@/app/types/auth';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import toast from 'react-hot-toast';
import { register as registerUser } from '../../../lib/clientApi';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .email()
      .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Invalid email format')
      .required('Email is required'),
    password: yup
      .string()
      .min(7, 'Password must be at least 7 characters')
      .required('Enter a valid Password'),
  })
  .required();

export default function RegisterForm() {
  const router = useRouter();
  // const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log(data);
      const res = await registerUser(data);
      if (res) {
        toast.success('Registration successful!');
        router.push('/recommended');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
    const errorMessage = (error as ApiError).response?.data?.error 
      ?? (error as ApiError).message 
      ?? 'Oops... some error';
      
    toast.error(errorMessage);
  }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.fieldWrapper}>
        <div
          className={`${css.inputGroup} ${
            errors.name ? css.hasError : dirtyFields.name ? css.isSuccess : ''
          }`}
        >
          <label htmlFor="name" className={css.label}>
            Name:
          </label>
          <input
            id="name"
            className={css.input}
            {...register('name')}
            placeholder="Ilona Ratushniak"
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>
      </div>

      <div className={css.fieldWrapper}>
        <div
          className={`${css.inputGroup} ${
            errors.email ? css.hasError : dirtyFields.email ? css.isSuccess : ''
          }`}
        >
          <label htmlFor="email" className={css.label}>
            Mail:
          </label>
          <input
            id="email"
            className={css.input}
            {...register('email')}
            placeholder="Your@email.com"
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
      </div>

      <div className={css.fieldWrapper}>
        <div
          className={`${css.inputGroup} ${
            errors.password
              ? css.hasError
              : dirtyFields.password
                ? css.isSuccess
                : ''
          }`}
        >
          <label htmlFor="password" className={css.label}>
            Password:
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            className={css.input}
            {...register('password')}
            placeholder="Yourpasswordhere"
          />
          <button
            type="button"
            className={css.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <p>y</p> : <p>n</p>}
          </button>
          {errors.password ? (
            <p className={css.error}>{errors.password.message}</p>
          ) : dirtyFields.password ? (
            <p className={css.successText}>Password is secure</p>
          ) : null}
        </div>
      </div>

      <div className={css.actions}>
        <button type="submit" className={css.submitBtn}>
          Registration
        </button>
        <Link href="/login" className={css.loginLink}>
          Already have an account?
        </Link>
      </div>
    </form>
  );
}
