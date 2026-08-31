const fetchPromiseCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method || 'GET';

  if (method.toUpperCase() !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  const cacheKey = url;
  if (fetchPromiseCache.has(cacheKey)) {
    return fetchPromiseCache.get(cacheKey)!;
  }

  const promise = fetch(url, options)
    .then(res => res.json())
    .catch(err => {
      throw err;
    })
    .finally(() => {
      fetchPromiseCache.delete(cacheKey);
    });

  fetchPromiseCache.set(cacheKey, promise);
  return promise;
}
