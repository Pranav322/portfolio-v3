import { useEffect, useState } from 'react';
import { IconMusic } from '@tabler/icons-react';

interface Track {
  title: string;
  artist: string;
  url: string;
  albumImageUrl: string;
}

export function TopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const res = await fetch('/api/spotify/top-tracks');
        const data = await res.json();
        setTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/50">
        <IconMusic className="animate-pulse" size={20} />
        <span>Loading top tracks...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-white/90 text-lg font-medium">Top Tracks</h2>
      <div className="space-y-2">
        {tracks.map((track, index) => (
          <a
            key={track.url}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <span className="text-white/40 w-6 text-center">{index + 1}</span>
            <img
              src={track.albumImageUrl}
              alt={track.title}
              className="w-12 h-12 rounded-md shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{track.title}</p>
              <p className="text-white/60 text-sm truncate">{track.artist}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
