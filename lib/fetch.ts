const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  if (fetchCache.has(url)) {
    return fetchCache.get(url)!;
  }

  const promise = fetch(url, options)
    .then(res => res.json())
    .finally(() => {
      fetchCache.delete(url);
    });

  fetchCache.set(url, promise);
  return promise;
}
