'use client'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import css from './AuthForm.module.css';
import { LoginFormData } from '@/app/types/auth'; 
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


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
      .required('Enter a valid Password')
  })
  .required();

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange', 
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login data:', data);   
    router.push('/recommended');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        
   
      <div className={css.fieldWrapper}>
        <div className={`${css.inputGroup} ${
          errors.email ? css.hasError : dirtyFields.email ? css.isSuccess : ''
        }`}>
          <label htmlFor="email" className={css.label}>Mail:</label>
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
        <div className={`${css.inputGroup} ${
          errors.password ? css.hasError : dirtyFields.password ? css.isSuccess : ''
        }`}>
          <label htmlFor="password" className={css.label}>Password:</label>
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
            {showPassword ? <p>y</p> : <p>n</p> }
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
          Log In
        </button>
        <Link href="/register" className={css.loginLink}>
          Don’t have an account?
        </Link>
      </div>

    </form>
  );
}