import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://localhost:3000/api/spotify/callback',
    }),
  });

  const data = await tokenResponse.json();

  // Display the refresh token on the page
  return new Response(
    `
    <html>
      <body>
        <h1>Your Refresh Token:</h1>
        <p>${data.refresh_token}</p>
        <p>Copy this token and add it to your .env.local file as SPOTIFY_REFRESH_TOKEN</p>
      </body>
    </html>
  `,
    {
      headers: {
        'Content-Type': 'text/html',
      },
    }
  );
}
