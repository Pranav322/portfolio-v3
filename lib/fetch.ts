const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = `${url}:${JSON.stringify(options || {})}`;

  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey) as Promise<T>;
  }

  const fetchPromise = fetch(url, options)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }
      return response.json();
    })
    .finally(() => {
      fetchCache.delete(cacheKey);
    });

  fetchCache.set(cacheKey, fetchPromise);
  return fetchPromise;
}
