import { getNowPlaying } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getNowPlaying();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching now playing' }, { status: 500 });
  }
}
