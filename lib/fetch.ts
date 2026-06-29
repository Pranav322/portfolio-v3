const pendingRequests = new Map<string, Promise<any>>();

export function deduplicatedFetchJSON<T = any>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method || 'GET';

  if (method !== 'GET') {
    return fetch(url, options).then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    });
  }

  const cacheKey = url;

  if (pendingRequests.has(cacheKey)) {
    return pendingRequests.get(cacheKey) as Promise<T>;
  }

  const promise = fetch(url, options)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .catch(error => {
      pendingRequests.delete(cacheKey);
      throw error;
    });

  pendingRequests.set(cacheKey, promise);

  promise.finally(() => {
    setTimeout(() => {
      if (pendingRequests.get(cacheKey) === promise) {
        pendingRequests.delete(cacheKey);
      }
    }, 50);
  });

  return promise;
}
