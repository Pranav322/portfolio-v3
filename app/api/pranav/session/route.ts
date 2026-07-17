import { NextRequest, NextResponse } from 'next/server';
import { getChatSecurityConfig } from '@/lib/pranav/config';
import {
  CHAT_SESSION_COOKIE,
  CHAT_SESSION_SECONDS,
  createSessionToken,
  getClientIp,
  hashClientIp,
  verifySessionToken,
} from '@/lib/pranav/security';

export const runtime = 'nodejs';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  path: '/',
  maxAge: CHAT_SESSION_SECONDS,
};

export async function GET(request: NextRequest) {
  try {
    const { sessionSecret } = getChatSecurityConfig();
    const ipHash = hashClientIp(getClientIp(request), sessionSecret);
    const verified = verifySessionToken(
      request.cookies.get(CHAT_SESSION_COOKIE)?.value,
      ipHash,
      sessionSecret
    );
    return NextResponse.json({ verified });
  } catch {
    return NextResponse.json({ verified: false });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sessionSecret, turnstileSecret } = getChatSecurityConfig();
    const { token } = (await request.json()) as { token?: string };
    if (!token) {
      return NextResponse.json({ error: 'Complete the verification first.' }, { status: 400 });
    }

    const ip = getClientIp(request);
    const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: token,
        remoteip: ip === 'unknown' ? undefined : ip,
        idempotency_key: crypto.randomUUID(),
      }),
    });
    const result = (await verification.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };

    const expectedHost = (request.headers.get('x-forwarded-host') || request.headers.get('host'))
      ?.split(':')[0]
      .toLowerCase();
    const productionHostnameMatches =
      process.env.NODE_ENV !== 'production' || !result.hostname || result.hostname === expectedHost;

    if (
      !result.success ||
      (result.action && result.action !== 'portfolio-chat') ||
      !productionHostnameMatches
    ) {
      return NextResponse.json(
        { error: 'Verification failed. Please try again.' },
        { status: 403 }
      );
    }

    const ipHash = hashClientIp(ip, sessionSecret);
    const response = NextResponse.json({ verified: true, expiresIn: CHAT_SESSION_SECONDS });
    response.cookies.set(
      CHAT_SESSION_COOKIE,
      createSessionToken(ipHash, sessionSecret),
      cookieOptions
    );
    return response;
  } catch (error) {
    console.error('Turnstile session error', error);
    return NextResponse.json(
      { error: 'Verification is temporarily unavailable.' },
      { status: 503 }
    );
  }
}
