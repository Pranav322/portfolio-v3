import { getRecentlyPlayed } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getRecentlyPlayed();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching recently played tracks', tracks: [] },
      { status: 500 }
    );
  }
}
