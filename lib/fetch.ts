const fetchPromiseMap = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent fetch requests to the same URL.
 * If a request to the URL is already in-flight, it returns the existing promise
 * instead of initiating a new network request.
 *
 * PERFORMANCE IMPACT:
 * Prevents redundant concurrent requests to the backend (e.g., /api/spotify/top-artists
 * being called by multiple sibling components simultaneously). This reduces backend
 * processing load, saves network bandwidth, and avoids rate limiting.
 */
export async function deduplicatedFetchJSON<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const cacheKey = url;
  if (fetchPromiseMap.has(cacheKey)) {
    return fetchPromiseMap.get(cacheKey)!;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Fetch failed: ${res.statusText}`);
      }
      return res.json();
    })
    .finally(() => {
      fetchPromiseMap.delete(cacheKey);
    });

  fetchPromiseMap.set(cacheKey, promise);
  return promise;
}
