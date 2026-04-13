import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';


export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    console.log('cookieStore:', cookieStore);
    // const search = request.nextUrl.searchParams.get('search') ?? '';
    // const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    // const rawTag = request.nextUrl.searchParams.get('tag') ?? '';
    // const tag = rawTag === 'All' ? '' : rawTag;
const token = cookieStore.get('accessToken')?.value;



    // 2. Якщо токена немає, одразу повертаємо 401 (юзер не залогінений)
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const page = Number(request.nextUrl.searchParams.get('page')) || 1;
    const limit = Number(request.nextUrl.searchParams.get('limit')) || 2;
    const res = await api('/books/recommend', {
      params: {
        // ...(search !== '' && { search }),
        // page,
        // perPage: 12,
        // ...(tag && { tag }),
        page,
        limit,
      },
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