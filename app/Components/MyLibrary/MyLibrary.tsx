'use client';
import { useForm, Controller } from 'react-hook-form';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/react';
import css from './MyLibrary.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import BookCard from '../Shared/BookCard/BookCard';
import { OwnBook, ProgressFilter } from '@/app/types/book';
import { deleteBookFromLibrary, getOwnBooks } from '@/app/lib/clientApi';
import { ApiError } from '@/app/api/api';
import BookDetailsModal from '../Shared/BookDetailsModal/BookDetailsModal';
import { Loader } from '../Shared/Loader/Loader';

interface FormInput {
  progress: ProgressFilter;
}

const OPTIONS = [
  { value: ProgressFilter.allBooks, label: 'All books' },
  { value: ProgressFilter.unread, label: 'Unread' },
  { value: ProgressFilter.inProgress, label: 'In progress' },
  { value: ProgressFilter.done, label: 'Done' },
];

export default function MyLibrary() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentProgress =
    (searchParams.get('status') as ProgressFilter) || ProgressFilter.allBooks;

  const [bookDetails, setBookDetails] = useState<OwnBook | null>(null);
  const handleOpenModal = (book: OwnBook) => setBookDetails(book);
  const handleCloseModal = () => setBookDetails(null);

  const { watch, control } = useForm<FormInput>({
    defaultValues: {
      progress: currentProgress,
    },
  });
  
  const selectedProgress = watch('progress');
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentStatusInUrl = params.get('status') || ProgressFilter.allBooks;

    if (currentStatusInUrl === selectedProgress) {
      return;
    }

    if (selectedProgress === ProgressFilter.allBooks) {
      params.delete('status');
    } else {
      params.set('status', selectedProgress);
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [selectedProgress, pathname, router, searchParams]);

  const status = searchParams.get('status') || undefined;
  const { data, isError, isLoading } = useQuery({
    queryKey: ['books', 'own', status],
    queryFn: () => getOwnBooks(status),
    placeholderData: keepPreviousData,
  });
  
  useEffect(() => {
    if (isError) {
      toast.error('Sorry, something went wrong, please try again');
    }
  }, [isError]);

  const queryClient = useQueryClient();
  const { mutate, isPending, variables } = useMutation({
    mutationFn: async (id: string) => await deleteBookFromLibrary(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['books'],
      });
      toast('Successfully deleted from the library!');
    },
    onError: (error: ApiError) => {
      toast.error('Sorry, something went wrong. Please try again.');
    },
  });

  const handleDeleteBook = async (id: string) => {
    mutate(id);
  };

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <section className={css.myLibrarySection}>
      <div className={css.header}>
        <h2>My Library</h2>
        <form>
          <Controller
            control={control}
            name="progress"
            render={({ field: { value, onChange } }) => {
             
              const selectedOption = OPTIONS.find((opt) => opt.value === value);

              return (
                <Listbox value={value} onChange={onChange}>
                  <div className={css.selectContainer}>
                    <ListboxButton className={css.dropdownButton}>
                      {selectedOption?.label}
                      <svg
                        width="16"
                        height="16"
                        
                        className={css.chevron}
                      >
                        <use href='/sprite.svg#icon-chevron-down'></use>
                      </svg>
                    </ListboxButton>

                    <ListboxOptions className={css.optionsList}>
                      {OPTIONS.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option.value}
                          className={({ active, selected }) =>
                            `${css.option} ${
                              active || selected ? css.optionActive : ''
                            }`
                          }
                        >
                          {option.label}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              );
            }}
          />
        </form>
      </div>
      
      <ul className={css.booksGrid}>
        {data?.map((book) => {
          const isDeletingThisBook = isPending && variables === book._id;
        
        return (
          <li
            key={book._id}
            className={css.bookCard}
            onClick={() => handleOpenModal(book)}
          >
            <BookCard
              book={book}
              size="medium"
              onDeleteClick={() => handleDeleteBook(book._id)}
              isDeleting={isDeletingThisBook}
            />
          </li>
        )})}
      </ul>

      {bookDetails && (
        <BookDetailsModal
          book={bookDetails}
          onClose={handleCloseModal}
          startReading
        />
      )}
    </section>
  );
}