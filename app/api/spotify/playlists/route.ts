import { getPlaylists } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await getPlaylists();
    // Ensure we always return an array
    const playlists = response.playlists || [];
    return NextResponse.json({ playlists });
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return NextResponse.json({ error: 'Error fetching playlists', playlists: [] }, { status: 500 });
  }
}
