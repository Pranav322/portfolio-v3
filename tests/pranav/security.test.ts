import { describe, expect, test } from 'bun:test';
import {
  cleanModelText,
  createSessionToken,
  hashClientIp,
  verifySessionToken,
} from '@/lib/pranav/security';

describe('Pranav chat security', () => {
  const secret = 'a sufficiently long test-only secret';
  const ipHash = hashClientIp('203.0.113.4', secret);

  test('accepts a signed session for the same visitor', () => {
    expect(verifySessionToken(createSessionToken(ipHash, secret), ipHash, secret)).toBe(true);
  });

  test('rejects a session replayed from another IP', () => {
    const token = createSessionToken(ipHash, secret);
    expect(verifySessionToken(token, hashClientIp('203.0.113.5', secret), secret)).toBe(false);
  });

  test('rejects tampered session data', () => {
    expect(verifySessionToken(`${createSessionToken(ipHash, secret)}x`, ipHash, secret)).toBe(
      false
    );
  });

  test('removes leaked reasoning markers', () => {
    expect(cleanModelText('</think>Grounded answer')).toBe('Grounded answer');
  });
});
