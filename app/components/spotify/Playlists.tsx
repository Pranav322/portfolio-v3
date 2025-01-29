import { useEffect, useState } from 'react';
import { IconPlaylist } from '@tabler/icons-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
interface Playlist {
  name: string;
  image: string;
  tracks: number;
  url: string;
}

export function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch('/api/spotify/playlists');
        const data = await res.json();
        setPlaylists(data.playlists);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylists();
  }, []);

  if (loading) return <LoadingSpinner text="Loading playlists..." />;

  if (!playlists || playlists.length === 0) {
    return <div className="text-center py-4 text-white/50">No playlists found</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {playlists?.map(playlist => (
        <a
          key={playlist.url}
          href={playlist.url}
          className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10"
        >
          {playlist.image ? (
            <img src={playlist.image} alt={playlist.name} className="w-12 h-12 rounded-md" />
          ) : (
            <div className="w-12 h-12 rounded-md bg-white/10 flex items-center justify-center">
              <IconPlaylist size={24} className="text-white/40" />
            </div>
          )}
          <div>
            <p className="font-medium text-white/90">{playlist.name}</p>
            <p className="text-sm text-white/60">{playlist.tracks} tracks</p>
          </div>
        </a>
      ))}
    </div>
  );
}
