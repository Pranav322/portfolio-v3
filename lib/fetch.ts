const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  if (options?.method && options.method.toUpperCase() !== 'GET') {
    return fetch(url, options).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    });
  }

  const cacheKey = url;
  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey)!;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .catch(err => {
      fetchCache.delete(cacheKey);
      throw err;
    })
    .finally(() => {
      setTimeout(() => fetchCache.delete(cacheKey), 50);
    });

  fetchCache.set(cacheKey, promise);
  return promise;
}
