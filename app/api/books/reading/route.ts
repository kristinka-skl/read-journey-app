import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { deleteReadingSessionRequest } from '@/app/types/book';


export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies();
      const token = cookieStore.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    
    const bookId = request.nextUrl.searchParams.get('bookId');
    const readingId = request.nextUrl.searchParams.get('readingId');

    const queryParams: deleteReadingSessionRequest = {
        bookId: bookId || '',
        readingId: readingId || '',
     };
    
    const res = await api.delete('/books/reading', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
    //   logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    // logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}