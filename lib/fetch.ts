/**
 * In-memory cache to deduplicate concurrent fetch requests.
 * By caching the Promise, if multiple components request the same URL
 * simultaneously (e.g., TopArtists and TopGenres fetching /api/spotify/top-artists),
 * they will all wait for the single network request to complete.
 */
const pendingFetches = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  // We stringify the options to ensure requests with different options (like POST vs GET)
  // don't incorrectly share the same cached Promise.
  const cacheKey = `${url}-${JSON.stringify(options || {})}`;

  if (pendingFetches.has(cacheKey)) {
    return pendingFetches.get(cacheKey) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
      }
      return res.json();
    })
    .catch(error => {
      pendingFetches.delete(cacheKey);
      throw error;
    })
    .finally(() => {
      pendingFetches.delete(cacheKey);
    });

  pendingFetches.set(cacheKey, promise);
  return promise;
}
