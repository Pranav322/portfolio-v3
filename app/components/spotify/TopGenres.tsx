import React, { useState, useEffect } from 'react';

export function TopGenres() {
  const [genres, setGenres] = useState<{ genre: string; count: number }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch('/api/spotify/top-artists');
      const data = await res.json();
      const genreCount = data.artists.reduce((acc: any, artist: any) => {
        artist.genres.forEach((genre: string) => {
          acc[genre] = (acc[genre] || 0) + 1;
        });
        return acc;
      }, {});
      setGenres(
        Object.entries(genreCount)
          .map(([genre, count]) => ({ genre, count: count as number }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8)
      );
    };
    fetchGenres();
  }, []);

  return (
    <div className="flex flex-wrap gap-2">
      {genres.map(g => (
        <span key={g.genre} className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-white/80">
          {g.genre} ({g.count})
        </span>
      ))}
    </div>
  );
}
