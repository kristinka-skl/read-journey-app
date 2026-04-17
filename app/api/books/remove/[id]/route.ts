import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const res = await api.delete(`/books/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return NextResponse.json(res.data, { status: res.status });
    
  } catch (error) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message || error.message;
      return NextResponse.json(
        { error: errorMessage },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}