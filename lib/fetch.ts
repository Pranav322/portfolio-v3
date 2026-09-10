const fetchPromiseCache = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent GET requests to the same URL.
 * Promises are cached in-memory while pending, and cleared from the cache
 * once they settle (using .finally()), ensuring subsequent component mounts
 * fetch fresh data instead of stale resolved promises.
 */
export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method?.toUpperCase() || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  const cacheKey = url;

  if (fetchPromiseCache.has(cacheKey)) {
    return fetchPromiseCache.get(cacheKey) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => res.json())
    .catch(error => {
      throw error;
    })
    .finally(() => {
      fetchPromiseCache.delete(cacheKey);
    });

  fetchPromiseCache.set(cacheKey, promise);

  return promise;
}
