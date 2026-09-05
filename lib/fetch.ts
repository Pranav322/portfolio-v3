// ⚡ Bolt Performance Optimization
// Client-side sibling components (like TopArtists and TopGenres) fetching the same endpoint
// simultaneously trigger duplicate network requests. This in-memory Promise cache deduplicates
// concurrent fetch requests, returning the same Promise for in-flight requests to the same URL.
export const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  if (fetchCache.has(url)) {
    return fetchCache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Fetch failed with status ${res.status}`);
      }
      return res.json();
    })
    .catch(err => {
      throw err;
    })
    .finally(() => {
      fetchCache.delete(url);
    });

  fetchCache.set(url, promise);
  return promise;
}
