const promiseCache = new Map<string, Promise<any>>();

export async function deduplicatedFetchJSON<T = any>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const key = `${url}-${JSON.stringify(options || {})}`;

  if (promiseCache.has(key)) {
    return promiseCache.get(key) as Promise<T>;
  }

  const fetchPromise = fetch(url, options)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }
      return response.json();
    })
    .catch(error => {
      throw error;
    })
    .finally(() => {
      promiseCache.delete(key);
    });

  promiseCache.set(key, fetchPromise);
  return fetchPromise;
}
