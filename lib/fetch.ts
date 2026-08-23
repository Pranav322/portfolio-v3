const fetchCache = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent fetch requests to the same URL.
 * If a request is already in-flight for a given URL and options,
 * it returns the existing Promise instead of initiating a new network request.
 * Expected impact: Reduces duplicate API calls from sibling components
 * (e.g. TopArtists and TopGenres requesting /api/spotify/top-artists simultaneously) by 100% during the initial mount.
 */
export function deduplicatedFetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = url + (options ? JSON.stringify(options) : '');
  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(async res => {
      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.statusText}`);
      }
      return res.json() as Promise<T>;
    })
    .finally(() => {
      // Ensure the cache is cleared once the promise settles (resolved or rejected)
      // to avoid permanently caching stale data.
      fetchCache.delete(cacheKey);
    });

  fetchCache.set(cacheKey, promise);
  return promise;
}
