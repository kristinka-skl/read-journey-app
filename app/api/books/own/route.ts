import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';
import { BookStatus } from '@/app/types/book';

interface QueryParams{
    status?: BookStatus
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
      const token = cookieStore.get('accessToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const rawStatus = request.nextUrl.searchParams.get('status');   

    const queryParams: QueryParams = {};

    if (rawStatus) {
      queryParams.status = rawStatus as BookStatus;
    }
  
   
    const res = await api('/books/own', {
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