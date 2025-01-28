'use client';
import { SPOTIFY_AUTH_URL } from '../api/spotify/auth';

export default function SpotifyAuth() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <a
        href={SPOTIFY_AUTH_URL}
        className="px-4 py-2 bg-[#1DB954] text-white rounded-full hover:bg-[#1ed760] transition-colors"
      >
        Connect Spotify
      </a>
    </div>
  );
}
