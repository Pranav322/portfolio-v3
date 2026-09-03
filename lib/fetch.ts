const fetchCache = new Map<string, Promise<any>>();

// Deduplicates concurrent GET requests for the same URL to prevent redundant API calls
// Expected performance metric: Reduces redundant network requests for identical endpoints by 100% during concurrent component mounts.
export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  const cacheKey = url;

  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => res.json())
    .catch(err => {
      throw err;
    })
    .finally(() => {
      fetchCache.delete(cacheKey);
    });

  fetchCache.set(cacheKey, promise);
  return promise;
}
