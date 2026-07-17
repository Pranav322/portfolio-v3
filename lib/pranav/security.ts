import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';

export const CHAT_SESSION_COOKIE = 'pranav_chat_session';
export const CHAT_SESSION_SECONDS = 30 * 60;

type SessionPayload = {
  ipHash: string;
  expiresAt: number;
};

const sign = (value: string, secret: string) =>
  createHmac('sha256', secret).update(value).digest('base64url');

export const getClientIp = (request: NextRequest) =>
  request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
  request.headers.get('x-real-ip')?.trim() ||
  'unknown';

export const hashClientIp = (ip: string, secret: string) =>
  createHmac('sha256', secret).update(`portfolio-chat:${ip}`).digest('hex');

export const createSessionToken = (ipHash: string, secret: string) => {
  const payload: SessionPayload = {
    ipHash,
    expiresAt: Math.floor(Date.now() / 1000) + CHAT_SESSION_SECONDS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded, secret)}`;
};

export const verifySessionToken = (
  token: string | undefined,
  expectedIpHash: string,
  secret: string
) => {
  if (!token) return false;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;

  const expectedSignature = sign(encoded, secret);
  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as SessionPayload;
    return payload.ipHash === expectedIpHash && payload.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export const cleanModelText = (value: string) =>
  value.replace(/<\/?think>/gi, '').replace(/<\/?reasoning>/gi, '');
