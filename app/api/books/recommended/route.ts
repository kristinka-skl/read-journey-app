import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { FiltersFormData } from '@/app/types/book';


export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
      const token = cookieStore.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 2;
    const title = request.nextUrl.searchParams.get('title');
    const author = request.nextUrl.searchParams.get('author');

    const queryParams: FiltersFormData = {
      page,
      limit, 
    };
    if (title) queryParams.title = title;
    if (author) queryParams.author = author;
  
   
    const res = await api('/books/recommend', {
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