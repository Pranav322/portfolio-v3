const fetchCache = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  if (options?.method && options.method !== 'GET') {
    return fetch(url, options).then(res => res.json());
  }

  if (fetchCache.has(url)) {
    return fetchCache.get(url)!;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .catch(error => {
      fetchCache.delete(url);
      throw error;
    })
    .finally(() => {
      fetchCache.delete(url);
    });

  fetchCache.set(url, promise);
  return promise;
}
