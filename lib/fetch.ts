/**
 * ⚡ Bolt Performance Optimization:
 * In-memory promise cache for deduplicating concurrent fetch requests.
 * Sibling components requesting the same endpoint simultaneously will
 * reuse the same in-flight Promise instead of triggering redundant network calls.
 * The promise is removed from the cache once resolved to ensure future
 * requests fetch fresh data.
 */
const promiseCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = `${url}-${JSON.stringify(options || {})}`;

  if (promiseCache.has(cacheKey)) {
    return promiseCache.get(cacheKey) as Promise<T>;
  }

  const fetchPromise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      }
      return res.json();
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      // Remove the promise from the cache once it settles,
      // so subsequent calls will fetch fresh data instead of returning old data.
      promiseCache.delete(cacheKey);
    });

  promiseCache.set(cacheKey, fetchPromise);
  return fetchPromise;
}
