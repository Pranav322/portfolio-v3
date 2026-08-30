const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method?.toUpperCase() || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  if (fetchCache.has(url)) {
    return fetchCache.get(url) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .catch(err => {
      throw err;
    })
    .finally(() => {
      fetchCache.delete(url);
    });

  fetchCache.set(url, promise);
  return promise;
}
