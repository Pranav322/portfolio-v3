const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const cacheKey = url;
  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey)! as Promise<T>;
  }

  const fetchPromise = fetch(url, options).then(res => {
    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status}`);
    }
    return res.json();
  });

  fetchCache.set(cacheKey, fetchPromise);

  fetchPromise
    .catch(() => {})
    .finally(() => {
      fetchCache.delete(cacheKey);
    });

  return fetchPromise as Promise<T>;
}
