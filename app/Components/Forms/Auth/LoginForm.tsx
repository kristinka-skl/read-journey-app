'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { login as loginUser } from '../../../lib/clientApi';
import css from './AuthForm.module.css';
import { LoginFormData } from '@/app/types/auth';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiError } from '@/app/api/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/app/store/authStore';

const schema = yup
  .object({
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

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);
  // const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser(data);
      if (res) {
        setUser(res);
        toast.success('Login successful!');
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
            {showPassword ? 
            <svg className={css.eye} width={18} height={18}><use href='/sprite.svg#icon-eye'></use></svg>
            
             : <svg className={css.eye} width={18} height={18}><use href='/sprite.svg#icon-eye-off'></use></svg>}
          </button>

          {errors.password ? (
            <p className={css.error}>{errors.password.message}</p>
          ) : dirtyFields.password ? (
            <p className={css.successText}>Password is secure</p>
          ) : null}
        </div>
      </div>
<div className={`${css.fieldWrapper} ${css.hidden}`}>
  <div className={css.inputGroup}></div>
</div>
      <div className={css.actions}>
        <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
        <Link href="/register" className={css.loginLink}>
          Don’t have an account?
        </Link>
      </div>
    </form>
  );
}
