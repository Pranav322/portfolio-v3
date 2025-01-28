import { getTopTracks } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getTopTracks();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching top tracks' }, { status: 500 });
  }
}
