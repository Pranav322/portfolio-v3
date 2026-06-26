const cache = new Map<string, { promise: Promise<any>; expiresAt: number }>();

export function fetchWithCache(url: string, ttl = 300000) {
  const now = Date.now();
  const cached = cache.get(url);

  if (cached && cached.expiresAt > now) {
    return cached.promise;
  }

  const promise = fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
      return res.json();
    })
    .catch(error => {
      cache.delete(url);
      throw error;
    });

  cache.set(url, { promise, expiresAt: now + ttl });
  return promise;
}
