const fetchPromiseCache = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent GET requests to the same URL.
 * Uses an in-memory Map to store the Promise of the fetch request.
 * Useful for sibling client components fetching the same API simultaneously.
 */
export async function deduplicatedFetchJSON<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  // We only deduplicate GET requests
  const method = options?.method?.toUpperCase() || 'GET';
  if (method !== 'GET') {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);
    return res.json();
  }

  const cacheKey = url;

  if (fetchPromiseCache.has(cacheKey)) {
    return fetchPromiseCache.get(cacheKey);
  }

  const promise = fetch(url, options)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      fetchPromiseCache.delete(cacheKey);
      throw error;
    })
    .finally(() => {
      // Clear the cache after the promise resolves/rejects
      // This ensures we only deduplicate *concurrent* requests, not cache responses forever.
      setTimeout(() => {
        if (fetchPromiseCache.get(cacheKey) === promise) {
          fetchPromiseCache.delete(cacheKey);
        }
      }, 0);
    });

  fetchPromiseCache.set(cacheKey, promise);
  return promise;
}
