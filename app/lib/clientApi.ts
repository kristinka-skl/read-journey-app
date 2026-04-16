import { LoginFormData, RegisterFormData } from '../types/auth';
import { Book, BookFormData, OwnBook } from '../types/book';
import { User } from '../types/user';
import { nextServer } from './api';

export const register = async (data: RegisterFormData) => {
  const res = await nextServer.post<User>('/users/signup', data);
  return res.data;
};

export const login = async (data: LoginFormData) => {
  const res = await nextServer.post<User>('/users/signin', data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await nextServer.get<User>('/users/current');
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post('/users/signout');
  return res.data;
};

interface FetchBooksResponse {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
}
export async function getBooks(
  page: number,
  limit: number,
  title?: string,
  author?: string
): Promise<FetchBooksResponse> {
  const { data } = await nextServer.get<FetchBooksResponse>(
    '/books/recommended',
    {
      params: {
        page,
        limit,
        ...(title && { title }),
        ...(author && { author }),
      },
    }
  );
  return data;
}

export async function addBookFromRecommended(book_id : string)  {
    const {data} = await nextServer.post<Book>(`/books/add/${book_id}`);
    return data;
}

export async function addBook(newBook: BookFormData): Promise<Book>  {
    const {data} = await nextServer.post<Book>('/books/add', newBook);
    return data;
}


export async function getOwnBooks(status?: string): Promise<OwnBook[]> {
  const { data } = await nextServer.get<OwnBook[]>('/books/own', {
    params: {
      status: status !== 'allBooks' ? status : undefined,
    },
  });

  return data; 
}
