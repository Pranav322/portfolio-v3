const fetchPromiseCache = new Map<string, Promise<any>>();

// ⚡ Bolt Performance Optimization:
// This in-memory Promise cache deduplicates concurrent API requests.
// When sibling components request the same endpoint simultaneously
// (e.g. TopArtists and TopGenres both fetching /api/spotify/top-artists),
// this returns the pending promise instead of firing a second network call.
// Expected Impact: Reduces duplicate network requests by 100% for shared endpoints.
export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  if (fetchPromiseCache.has(url)) {
    return fetchPromiseCache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .finally(() => {
      // Remove promise from cache once settled so subsequent mounts fetch fresh data
      fetchPromiseCache.delete(url);
    });

  fetchPromiseCache.set(url, promise);
  return promise;
}
