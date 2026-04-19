export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  recommend: boolean;
}
export interface BookFormData {
  page?: number;
  limit?: number;
  title?: string;
  author?: string;
  totalPages?: number;
}
export type BookStatus = 'unread' | 'in-progress' | 'done';

export enum ProgressFilter {
  unread = 'unread',
  inProgress = 'in-progress',
  done = 'done',
  allBooks = 'allBooks',
}

export interface ReadingProgress {
  startPage: number;
  startReading: string;
  finishPage: number;
  finishReading: string;
  speed: number;
  status: 'inactive' | 'active';
  _id?: string;
}

export interface OwnBook {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status: BookStatus;
  owner: string;
  progress: ReadingProgress[];
  timeLeftToRead?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

export interface ReadingRequest {
  id: string;
  page: number;
}
export interface deleteReadingSessionRequest {
  bookId: string;
  readingId: string;
}
