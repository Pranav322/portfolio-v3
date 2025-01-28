import { useEffect, useState } from 'react';
import { IconMusic, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-react';

interface NowPlayingResponse {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

export function NowPlaying() {
  const [data, setData] = useState<NowPlayingResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        const data = await res.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching now playing:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/50">
        <IconMusic className="animate-pulse" size={20} />
        <span>Loading...</span>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="flex items-center gap-2 text-white/50">
        <IconMusic size={20} />
        <span>Not playing</span>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
    >
      <img src={data.albumImageUrl} alt={data.album} className="w-16 h-16 rounded-md shadow-lg" />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{data.title}</p>
        <p className="text-white/60 text-sm truncate">{data.artist}</p>
        <p className="text-white/40 text-xs truncate">{data.album}</p>
      </div>
      <div className="text-green-400">
        {data.isPlaying ? (
          <IconPlayerPlay className="group-hover:scale-110 transition-transform" />
        ) : (
          <IconPlayerPause />
        )}
      </div>
    </a>
  );
}
