const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';

// ⚡ Bolt: Cache the Promise of the access token request.
// This prevents multiple concurrent components from firing duplicate token requests
// while the initial token request is still pending.
let cachedTokenPromise: Promise<any> | null = null;
let tokenExpirationTime = 0;

async function getAccessToken() {
  const now = Date.now();

  // Return the cached promise if it exists and hasn't expired (or is still pending)
  if (cachedTokenPromise && (tokenExpirationTime === 0 || now < tokenExpirationTime)) {
    return cachedTokenPromise;
  }

  // Reset the expiration time while the request is pending to prevent concurrent requests
  // from bypassing the cache during the refresh window
  tokenExpirationTime = 0;

  cachedTokenPromise = fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  })
    .then(res => res.json())
    .then(data => {
      // Set expiration time with a 60-second buffer
      tokenExpirationTime = Date.now() + (data.expires_in - 60) * 1000;
      return data;
    })
    .catch(error => {
      // Clear the cache on failure so we can retry
      cachedTokenPromise = null;
      tokenExpirationTime = 0;
      throw error;
    });

  return cachedTokenPromise;
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = await response.json();
  return {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
    album: song.item.album.name,
    albumImageUrl: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify,
  };
}

export async function getTopTracks() {
  const { access_token } = await getAccessToken();

  const response = await fetch(`${TOP_TRACKS_ENDPOINT}?limit=10&time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { items } = await response.json();

  return {
    tracks: items.map((track: any) => ({
      title: track.name,
      artist: track.artists.map((_artist: any) => _artist.name).join(', '),
      url: track.external_urls.spotify,
      albumImageUrl: track.album.images[0].url,
    })),
  };
}

export async function getTopArtists() {
  const { access_token } = await getAccessToken();
  const response = await fetch(`${TOP_ARTISTS_ENDPOINT}?limit=8`, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  const { items } = await response.json();
  return {
    artists: items.map((artist: any) => ({
      name: artist.name,
      image: artist.images[0]?.url,
      genres: artist.genres,
      url: artist.external_urls.spotify,
    })),
  };
}

export async function getPlaylists() {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me/playlists?limit=10', {
      headers: { Authorization: `Bearer ${access_token}` },
    });
    const { items } = await response.json();
    return {
      playlists: (items || []).map((playlist: any) => ({
        name: playlist.name,
        image: playlist.images?.[0]?.url,
        tracks: playlist.tracks?.total || 0,
        url: playlist.external_urls?.spotify || '#',
      })),
    };
  } catch (error) {
    console.error('Error in getPlaylists:', error);
    return { playlists: [] };
  }
}

export async function getRecentlyPlayed(): Promise<{ tracks: Track[] }> {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(`${RECENTLY_PLAYED_ENDPOINT}?limit=5`, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const data = await response.json();
    return {
      tracks: (data.items || []).map((item: any) => ({
        title: item.track.name,
        artist: item.track.artists.map((a: any) => a.name).join(', '),
        albumImageUrl: item.track.album.images[0]?.url,
        url: item.track.external_urls.spotify,
        playedAt: new Date(item.played_at).toLocaleTimeString(),
      })),
    };
  } catch (error) {
    console.error('Error fetching recently played:', error);
    return { tracks: [] };
  }
}
