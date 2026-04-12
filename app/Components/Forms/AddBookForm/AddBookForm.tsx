'use client';

import { useForm } from 'react-hook-form';

export const AddBookForm = () => {
  const { handleSubmit } = useForm();

  const onSubmit = async (
    // data
) => {
    // Логіка відправки на бекенд та виклику нотифікацій
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder='Book title'/>
      <button type="submit">Add book</button>
    </form>
  );
};