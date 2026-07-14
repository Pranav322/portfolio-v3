const fetchCache = new Map<string, Promise<any>>();

export const deduplicatedFetchJSON = async <T = any>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const cacheKey = url;
  if (fetchCache.has(cacheKey)) {
    return fetchCache.get(cacheKey)!;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .finally(() => {
      fetchCache.delete(cacheKey);
    });

  fetchCache.set(cacheKey, promise);
  return promise;
};
