const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';
const TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';

// ⚡ Bolt: Cache the access token promise to prevent duplicate concurrent network requests
// when multiple components (NowPlaying, TopTracks, etc.) render simultaneously.
let tokenPromiseCache: Promise<any> | null = null;
let tokenExpirationTime = 0;

async function getAccessToken() {
  const now = Date.now();

  // If we have a cached promise and it hasn't expired, return it immediately
  if (tokenPromiseCache && now < tokenExpirationTime) {
    return tokenPromiseCache;
  }

  // Create a new promise and cache it
  tokenPromiseCache = (async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
    });

    if (!response.ok) {
      // Clear the cache on failure so the next request can try again
      tokenPromiseCache = null;
      throw new Error(`Failed to fetch Spotify access token: ${response.status}`);
    }

    const data = await response.json();

    // Spotify tokens typically expire in 3600 seconds (1 hour)
    // We set expiration slightly earlier (55 minutes) to be safe
    // If expires_in isn't provided, default to 55 minutes
    const expiresInSeconds = data.expires_in || 3600;
    tokenExpirationTime = now + (expiresInSeconds - 300) * 1000;

    return data;
  })();

  // Evaluate tokenExpirationTime === 0 check to ensure we don't inadvertently
  // bypass the cache while the first request is still resolving
  // Setting an arbitrary initial expiration ensures subsequent synchronous callers
  // hit the cached promise instead of triggering a new fetch
  if (tokenExpirationTime === 0) {
    tokenExpirationTime = now + 10000;
  }

  return tokenPromiseCache;
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
