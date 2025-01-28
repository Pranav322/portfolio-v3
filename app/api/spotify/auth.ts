const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/api/spotify/callback';

const SPOTIFY_AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=user-read-currently-playing%20user-top-read%20user-read-recently-played`;

export { SPOTIFY_AUTH_URL };
