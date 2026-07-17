'use client';

import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action: string;
          theme: 'dark';
          size: 'flexible';
          callback: (token: string) => void;
          'error-callback': () => void;
          'expired-callback': () => void;
        }
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onVerified: () => void;
};

const developmentSiteKey = '1x00000000000000000000AA';

export function TurnstileWidget({ onVerified }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'error'>('idle');
  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    (process.env.NODE_ENV === 'development' ? developmentSiteKey : '');

  const verifyToken = useCallback(
    async (token: string) => {
      setStatus('checking');
      try {
        const response = await fetch('/api/pranav/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        if (!response.ok) throw new Error('Verification failed');
        onVerified();
      } catch {
        setStatus('error');
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      }
    },
    [onVerified]
  );

  useEffect(() => {
    if (!scriptReady || !siteKey || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      action: 'portfolio-chat',
      theme: 'dark',
      size: 'flexible',
      callback: verifyToken,
      'error-callback': () => setStatus('error'),
      'expired-callback': () => {
        setStatus('idle');
        if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      },
    });

    return () => {
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [scriptReady, siteKey, verifyToken]);

  if (!siteKey) {
    return <p className="text-sm text-red-300">Chat verification is not configured.</p>;
  }

  return (
    <div className="w-full max-w-sm space-y-3">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div ref={containerRef} className="min-h-[65px] w-full" />
      <p className="text-center text-xs text-white/50" aria-live="polite">
        {status === 'checking'
          ? 'Verifying…'
          : status === 'error'
            ? 'Verification failed. Please try again.'
            : 'A quick verification protects the public demo from abuse.'}
      </p>
    </div>
  );
}
