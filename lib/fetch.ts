export const fetchPromiseCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  if (fetchPromiseCache.has(url)) {
    return fetchPromiseCache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .finally(() => {
      fetchPromiseCache.delete(url);
    });

  fetchPromiseCache.set(url, promise);
  return promise;
}
