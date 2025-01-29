import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface Artist {
  name: string;
  image: string;
  genres: string[];
  url: string;
}

export function TopArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const res = await fetch('/api/spotify/top-artists');
        const data = await res.json();
        setArtists(data.artists);
      } finally {
        setLoading(false);
      }
    };
    fetchTopArtists();
  }, []);

  if (loading) return <LoadingSpinner text="Loading top artists..." />;

  return (
    <div className="grid grid-cols-2 gap-4">
      {artists.map(artist => (
        <a
          key={artist.url}
          href={artist.url}
          className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10"
        >
          <img src={artist.image} alt={artist.name} className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-medium text-white/90">{artist.name}</p>
            <p className="text-sm text-white/60">{artist.genres.slice(0, 2).join(', ')}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
