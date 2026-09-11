const promiseCache = new Map<string, Promise<any>>();

/**
 * Deduplicates concurrent GET requests to the same URL by caching the Promise
 * in memory until it resolves or rejects.
 */
export async function deduplicatedFetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method?.toUpperCase() || 'GET';

  if (method !== 'GET') {
    const res = await fetch(url, options);
    return res.json();
  }

  if (promiseCache.has(url)) {
    return promiseCache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .finally(() => {
      promiseCache.delete(url);
    });

  promiseCache.set(url, promise);
  return promise;
}
