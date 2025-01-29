import { getTopArtists } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getTopArtists();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching top artists' }, { status: 500 });
  }
}
