import { IconClock } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { Track } from '@/types/spotify';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export function RecentlyPlayed() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/spotify/recently-played');
        const { tracks } = await res.json();
        setTracks(tracks);
      } catch (error) {
        console.error('Error fetching recently played:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner text="Loading recent tracks..." />;

  return (
    <div className="space-y-2">
      {tracks.map(track => (
        <div key={track.playedAt} className="flex items-center gap-4 p-2 bg-white/5 rounded-lg">
          <img src={track.image} className="w-10 h-10 rounded-md" />
          <div className="flex-1">
            <p className="text-sm font-medium">{track.title}</p>
            <p className="text-xs text-white/60">{track.artist}</p>
          </div>
          <span className="text-xs text-white/40">{track.timeAgo}</span>
        </div>
      ))}
    </div>
  );
}
